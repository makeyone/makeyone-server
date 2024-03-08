import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { NamingStrategyInterface } from 'typeorm/naming-strategy/NamingStrategyInterface';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { TypeormCustomLogger } from '@src/libs/entity/config/custom-logger.config';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
}).parsed;

export const realTypeormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV !== 'prod',
  bigNumberStrings: false,
  // logging: process.env.NODE_ENV === 'dev' && ['query', 'error'],
  logger: new TypeormCustomLogger(true),
  charset: 'utf8mb4',
  entities: ['dist/**/!(core).entity{.ts,.js}'],
  namingStrategy: new SnakeNamingStrategy() as unknown as NamingStrategyInterface,
};
