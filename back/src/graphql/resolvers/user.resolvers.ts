import { ApolloError } from 'apollo-server';
import bcrypt from 'bcrypt';
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

export default {
  Query: {
    async getUserById(parent, args, context, info) {
      const user: User = await getById(+args.id);
      if (!user) {
        throw new ApolloError('User is not found', '404');
      }

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
        throw new ApolloError('Some information is missing!', '400');

      const passwordHash = await bcrypt.hash(
        password,
        authConfig.bcrypt.saltRounds,
      );
      const emailExist: User = await getByEmail(email);
      if (emailExist) {
        throw new ApolloError('Email is already taken!', '401');
      } else {
        args.newUser.password = passwordHash;
        return createUser(args.newUser);
      }
    },
    async updateUser(parent, args, context, info) {
      const userId: UserID = +args.userId;
      const updateInfo: Partial<User> = args.userUpdateInfo;
      const userFound: User = await getById(userId);
      if (!userFound) throw new ApolloError('This user does not exist!', '404');

      updateInfo.updatedAt = new Date();
      return updateUser(userId, updateInfo);
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
