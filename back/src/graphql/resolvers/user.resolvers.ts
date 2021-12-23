import { createUser, getAll, getByEmail, getById } from '../../repositories/user.repository';
import { User } from '../../entities/user.entity';
import { ApolloError } from 'apollo-server';
import bcrypt from 'bcrypt';
import { authConfig } from '../../config/auth';

export default {
  Query: {
    async getUserById (parent, args, context, info) {
      const user: User = await getById(args.id);
      if(!user) {
        throw new ApolloError('User is not found', '404');
      }

      return user;
    },
    async getAllUsers (parent, args, context, info) {
      return await getAll();
    }
  },
  Mutation: {
    async registerUser(parent, args, context, info) {
      const { name, email, password } = args.newUser;
      if(!name || !email || !password) throw new ApolloError('Some information is missing!', '400');

      const passwordHash = await bcrypt.hash(password, authConfig.bcrypt.saltRounds);
      const emailExist: User = await getByEmail(email);
      if(emailExist) {
        throw new ApolloError('Email is already taken!', '401');
      } else {
        args.newUser.password = passwordHash;
        return await createUser(args.newUser);
      }
    },
    async updateUser(parent, args, context, info) {
      // update user
    }
  }
}