import 'reflect-metadata';
import 'express-async-errors';
import { createConnection } from 'typeorm';
import { appConfig } from './config/app';
import { ormConfig } from './config/orm';
import apolloServer from './graphql/apollo.server';
import app from './app';
import { catchErrors } from './middlewares/catchErrors';

const { express } = app;
const hostname = 'localhost'; // dev

const start = async () => {
  try {
    await apolloServer.start();
    apolloServer.applyMiddleware({
      app: express,
      path: '/api/graphql',
    })

    express.use(catchErrors);

    express.listen(appConfig.port, async () => {
      console.log(
        `Server started and running on http://${hostname}:${appConfig.port}${apolloServer.graphqlPath}`,
      );
      await createConnection(ormConfig);
      console.log(`DB Connected!`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
