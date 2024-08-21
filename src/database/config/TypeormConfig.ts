import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { NamingStrategyInterface } from 'typeorm/naming-strategy/NamingStrategyInterface';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { addTransactionalDataSource } from 'typeorm-transactional';

import { TypeormCustomLogger } from '@src/database/config/TypeormCustomLogger';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
}).parsed;

const typeormConfig: TypeOrmModuleAsyncOptions = {
  useFactory() {
    return {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV !== 'prod',
      bigNumberStrings: false,
      logger: new TypeormCustomLogger(true),
      charset: 'utf8mb4',
      entities: ['dist/**/!(Base).entity{.ts,.js}'],
      namingStrategy: new SnakeNamingStrategy() as unknown as NamingStrategyInterface,
    };
  },
  async dataSourceFactory(options) {
    if (!options) {
      throw new Error('Invalid options passed');
    }

    return addTransactionalDataSource(new DataSource(options));
  },
};

export default typeormConfig;
