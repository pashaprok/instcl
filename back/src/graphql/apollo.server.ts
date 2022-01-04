import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import userGraphSchema from './schemas/user.schema';
import userGraphResolvers from './resolvers/user.resolvers';
import postGraphSchema from './schemas/post.schema';
import postGraphResolvers from './resolvers/post.resolvers';
import app from '../app';
import { User } from '../entities/user.entity';
import { defineUser } from '../utils/jwt';

const apolloServer = new ApolloServer({
  typeDefs: [ userGraphSchema, postGraphSchema ],
  resolvers: [ userGraphResolvers, postGraphResolvers ],
  plugins: [ ApolloServerPluginDrainHttpServer({ httpServer: app.http }) ],
  context: async ({ req, res }) => {
    await defineUser(req, res);
    return { req, res, User };
  },
});

export default apolloServer;
