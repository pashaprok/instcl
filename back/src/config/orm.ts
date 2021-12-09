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
  // seeds: [
  //     'seeds/**/*{.ts,.js}'
  // ],
  // factories: [
  //     'factories/**/*{.ts,.js}'
  // ],
  entities: ['entities/**/*{.ts,.js}'],
  migrations: ['migration/**/*{.ts,.js}'],
  subscribers: ['subscriber/**/*{.ts,.js}'],
  cli: {
    entitiesDir: 'entities',
    migrationsDir: 'migration',
    subscribersDir: 'subscriber',
  },
};
