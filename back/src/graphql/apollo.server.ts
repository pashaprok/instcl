import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import userGraphSchema from './schemas/user.schema';
import userGraphResolvers from './resolvers/user.resolvers';
import app from '../app';
import { User } from '../entities/user.entity';

const apolloServer = new ApolloServer({
  typeDefs: [userGraphSchema],
  resolvers: [userGraphResolvers],
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer: app.http })],
  context: ({ req, res }) => ({
    req,
    res,
    User,
  }),
});

export default apolloServer;
