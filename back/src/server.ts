import 'reflect-metadata';
import 'express-async-errors';
import { createConnection } from 'typeorm';
import { appConfig } from './config/app';
import { ormConfig } from './config/orm';
import apolloServer from './graphql/apollo.server';
import Express from 'express';
import app from './app';
import { catchErrors } from './middlewares/catchErrors';
import { appWorkLogger } from './utils/logger';
import { graphqlUploadExpress } from 'graphql-upload';
import path from 'path';
import cors from 'cors';

const { express } = app;
const hostname = 'localhost'; // dev

const start = async () => {
  try {
    await apolloServer.start();

    express.use(cors());
    express.use('/images', Express.static(path.resolve(__dirname, 'images')));
    express.use(graphqlUploadExpress());
    apolloServer.applyMiddleware({
      app: express,
      cors: {
        credentials: true,
        // origin: appConfig.frontLink
      },
      path: '/api/graphql',
    });

    express.use(catchErrors);
    express.listen(appConfig.port, async () => {
      appWorkLogger.info(
        `Server started and running on http://${hostname}:${appConfig.port}${apolloServer.graphqlPath}`,
      );
      await createConnection(ormConfig);
      appWorkLogger.info('DB Connected!');
    });
  } catch (e) {
    appWorkLogger.info(e);
  }
};

start();
