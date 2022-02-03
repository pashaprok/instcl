import { ConnectionOptions } from 'typeorm';

export const ormConfig: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DBHOST,
  port: +process.env.DBPORT,
  username: process.env.DBUSER,
  password: process.env.DBUSERPASS,
  database: process.env.DBNAME,
  synchronize: true,
  logging: false,
  entities: [`${__dirname}/../entities/**/*{.ts,.js}`],
  migrations: ['../migrations/**/*{.ts,.js}'],
  subscribers: ['../subscribers/**/*{.ts,.js}'],
  cli: {
    entitiesDir: 'entities',
    migrationsDir: 'migrations',
    subscribersDir: 'subscribers',
  },
};
