import { ApolloError, UserInputError } from 'apollo-server';
import bcrypt from 'bcrypt';
import { GraphQLUpload } from 'graphql-upload';
import {
  createUser,
  deleteUser,
  getAll,
  getByEmail,
  getById,
  updateUser,
} from '../../repositories/user.repository';
import { User } from '../../entities/user.entity';
import { authConfig } from '../../config/auth';
import { IResponseMsg } from '../../types/common.types';
import { UserID } from '../../types/user.types';
import { ValidationResponse } from '../../types/validation.types';
import { userPartialValidate } from '../../utils/validation';
import { authJWT, defineUserIdFromRequest } from '../../utils/jwt';
import { usersActivitiesLogger } from '../../utils/logger';
import { NotFound } from '../../utils/errors';
import {
  deleteImage,
  makeSquare,
  uploadImage,
} from '../../images/image.helpers';

export default {
  Upload: GraphQLUpload,
  Query: {
    async getCurrentUser(parent, args, context, info) {
      const id: UserID = defineUserIdFromRequest(context);
      const user: User = await getById(id);
      if (!user) NotFound('User');

      return user;
    },
    async getUserById(parent, args, context, info) {
      const user: User = await getById(+args.id);
      if (!user) NotFound('User');

      return user;
    },
    async getAllUsers(parent, args, context, info) {
      return getAll();
    },
  },
  Mutation: {
    async registerUser(parent, args, context, info) {
      const { name, email, password } = args.newUser;
      if (!name || !email || !password)
        throw new UserInputError('Some information is missing!');

      const userValidation: ValidationResponse = await userPartialValidate(
        args.newUser,
      );
      if (userValidation.status === 'fail') {
        throw new UserInputError(userValidation.msg, userValidation);
      }

      const passwordHash = await bcrypt.hash(
        password,
        authConfig.bcrypt.saltRounds,
      );
      const emailExist: User = await getByEmail(email);
      if (emailExist) {
        throw new ApolloError('Email is already taken!', '401');
      } else {
        args.newUser.avatar = '';
        if (args.avatar) {
          args.newUser.avatar = await uploadImage(args.avatar, 'avatar');
          await makeSquare('avatar', args.newUser.avatar);
        }

        args.newUser.password = passwordHash;
        const user: User = await createUser(args.newUser);
        const { accessToken, refreshToken } = await authJWT(context.res, user);

        usersActivitiesLogger.info(
          `User ${user.name} - ${user.email} is registered!(id: ${user.id})`,
        );

        return {
          accessToken,
          refreshToken,
          user,
        };
      }
    },
    async loginUser(parent, args, context, info) {
      const { email, password } = args.loginInfo;
      if (!email || !password)
        throw new UserInputError('Some information is missing!');

      const userValidation: ValidationResponse = await userPartialValidate(
        args.loginInfo,
      );
      if (userValidation.status === 'fail') {
        throw new UserInputError(userValidation.msg, userValidation);
      }

      const userFound: User = await getByEmail(email);
      if (!userFound || !(await bcrypt.compare(password, userFound.password))) {
        throw new UserInputError('Incorrect login or password!');
      } else {
        const { accessToken, refreshToken } = await authJWT(
          context.res,
          userFound,
        );

        usersActivitiesLogger.info(
          `User ${userFound.name} - ${userFound.email} is logged in!(id: ${userFound.id})`,
        );

        return {
          accessToken,
          refreshToken,
          user: userFound,
        };
      }
    },
    async updateCurrentUser(parent, args, context, info) {
      const userId: UserID = defineUserIdFromRequest(context);
      const updateInfo: Partial<User> = args.userUpdateInfo;
      const userValidation: ValidationResponse = await userPartialValidate(
        updateInfo,
      );
      if (userValidation.status === 'fail') {
        throw new UserInputError(userValidation.msg, userValidation);
      }

      const userFound: User = await getById(userId);
      if (!userFound) {
        throw new ApolloError('This user does not exist!', '404');
      }

      const emailDuplicate: User = await getByEmail(updateInfo.email);
      if (emailDuplicate) {
        if (
          emailDuplicate.email === updateInfo.email &&
          emailDuplicate.id !== userId
        ) {
          throw new ApolloError('This email is already taken!', '403');
        }
      }

      if (args.avatar) {
        updateInfo.avatar = await uploadImage(args.avatar, 'avatar');
        await makeSquare('avatar', updateInfo.avatar);
        await deleteImage(userFound.avatar, 'avatar');
      }

      updateInfo.updatedAt = new Date();
      const updatedUser: User = await updateUser(userId, updateInfo);

      const { accessToken, refreshToken } = await authJWT(
        context.res,
        updatedUser,
      );

      usersActivitiesLogger.info(
        `User ${updatedUser.name} - ${updatedUser.email} is updated!(id: ${updatedUser.id})`,
      );

      return {
        accessToken,
        refreshToken,
        user: updatedUser,
      };
    },
    async deleteUser(parent, args, context, info): Promise<IResponseMsg> {
      try {
        await deleteUser(+args.userId);
        return { message: 'success' };
      } catch (e) {
        return {
          message: 'fail',
          info: e,
        };
      }
    },
  },
};
