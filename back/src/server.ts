import 'reflect-metadata';
import 'express-async-errors';
import { createConnection } from 'typeorm';
import { appConfig } from './config/app';
import appServer from './app';
import { ormConfig } from './config/orm';

const hostname = 'localhost'; // dev

appServer.listen(appConfig.port, async () => {
  console.log(
    `Server started and running on http://${hostname}:${appConfig.port}`,
  );
  await createConnection(ormConfig);
  console.log(`DB Connected!`);
});
