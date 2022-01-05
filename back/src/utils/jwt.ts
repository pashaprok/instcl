import jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { Request, Response } from 'express';
import { ApolloError, AuthenticationError } from 'apollo-server';
import { User } from '../entities/user.entity';
import { authConfig } from '../config/auth';
import { mins, weeks } from '../constants/nums';
import { UserID } from '../types/user.types';
import { getById } from '../repositories/user.repository';

export class JWTLogic {
  readonly accessSecret = authConfig.accessToken.secret;

  readonly accessExpire = authConfig.accessToken.expire;

  readonly refreshSecret = authConfig.refreshToken.secret;

  readonly refreshExpire = authConfig.refreshToken.expire;

  private readonly user: User;

  constructor(user) {
    this.user = user;
  }

  static signToken(
    secret: string,
    expireTime: number,
    sub: UserID,
    hash?: string,
  ) {
    if (hash) {
      return jwt.sign({ sub, hash }, secret, {
        expiresIn: expireTime,
      });
    }

    return jwt.sign({ sub }, secret, {
      expiresIn: expireTime,
    });
  }

  static setCookieJWT(res: Response, access: string, refresh: string) {
    res.cookie('access', access, {
      httpOnly: true,
      expires: new Date(Date.now() + authConfig.refreshToken.expire * weeks),
      secure: true,
    });

    res.cookie('refresh', refresh, {
      httpOnly: true,
      expires: new Date(Date.now() + authConfig.refreshToken.expire * weeks),
      secure: true,
    });
  }

  static destroyCookieJWT(res: Response) {
    res.cookie('access', '', {
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: true,
    });

    res.cookie('refresh', '', {
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: true,
    });
  }

  createAccessToken() {
    return JWTLogic.signToken(
      this.accessSecret,
      this.accessExpire * mins,
      this.user.id,
    );
  }

  createRefreshToken(access) {
    const hash = JWTLogic.hashFromAccess(access);

    return JWTLogic.signToken(
      this.refreshSecret,
      this.refreshExpire * weeks,
      this.user.id,
      hash,
    );
  }

  static hashFromAccess(token) {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  static extractJWTFromCookie(req: Request) {
    let access = null;
    let refresh = null;
    if (req && req.cookies) {
      access = req.cookies.access;
      refresh = req.cookies.refresh;
    }
    return { access, refresh };
  }

  static extractJWT(req: Request) {
    let accessToken;
    let refreshToken;
    if (req.headers.access && req.headers.refresh) {
      accessToken = req.headers.access;
      refreshToken = req.headers.refresh;
    } else if (req.cookies && req.cookies.access && req.cookies.refresh) {
      accessToken = req.cookies.access;
      refreshToken = req.cookies.refresh;
    }

    return {
      access: accessToken,
      refresh: refreshToken,
    };
  }

  static async verifyAccess(accessToken: string, refreshToken: string) {
    const accessVerify = jwt.verify(
      accessToken,
      authConfig.accessToken.secret,
      { ignoreExpiration: true },
    );

    const refreshVerify = <jwt.JwtPayload>(
      jwt.verify(refreshToken, authConfig.refreshToken.secret)
    );

    if (!refreshVerify.sub || !accessVerify.sub) {
      throw new ApolloError('You are not authorized!', '401');
    }

    const userAccess = +accessVerify.sub;
    const userRefresh = +refreshVerify.sub;

    if (userAccess !== userRefresh) {
      throw new ApolloError('You are not authorized!', '401');
    }

    const hashAccess = JWTLogic.hashFromAccess(accessToken);
    if (hashAccess !== refreshVerify.hash) {
      throw new ApolloError('You are not authorized!', '401');
    }

    const userExist = await getById(userAccess);
    if (!userExist) {
      throw new ApolloError('You are not authorized!', '401');
    }

    const newAccessToken = new JWTLogic(userExist).createAccessToken();

    return {
      newAccessToken,
      user: userExist,
    };
  }
}

export async function authJWT(res: Response, user: User) {
  const jwtLogic = new JWTLogic(user);
  const accessToken = jwtLogic.createAccessToken();
  const refreshToken = jwtLogic.createRefreshToken(accessToken);
  JWTLogic.setCookieJWT(res, accessToken, refreshToken);
  return { accessToken, refreshToken };
}

async function verifyAndUpdateJWT(
  req: Request,
  res: Response,
  access: string,
  refresh: string,
) {
  const { newAccessToken, user } = await JWTLogic.verifyAccess(access, refresh);
  const newRefreshToken = new JWTLogic(user).createRefreshToken(newAccessToken);
  JWTLogic.setCookieJWT(res, newAccessToken, newRefreshToken);
  req.user = user;
  res.locals.user = user;
}

export async function defineUser(req: Request, res: Response) {
  const { access, refresh } = JWTLogic.extractJWT(req);
  if (access && refresh) {
    await verifyAndUpdateJWT(req, res, access, refresh);
  }
}

export function defineUserIdFromRequest(context): UserID {
  if (!context.req.user) {
    throw new AuthenticationError(
      'This action is available only to authorized users!',
    );
  }

  return context.req.user.id;
}
