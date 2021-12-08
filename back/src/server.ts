import 'reflect-metadata';
import 'express-async-errors';
import { appConfig } from './config/app';
import appServer from './app';

const hostname = 'localhost'; // dev

appServer.listen(appConfig.port, async () => {
  console.log(
    `Server started and running on http://${hostname}:${appConfig.port}`,
  );
});
