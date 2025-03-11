import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { NamingStrategyInterface } from 'typeorm/naming-strategy/NamingStrategyInterface';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { addTransactionalDataSource } from 'typeorm-transactional';

import { TypeormCustomLogger } from '@src/database/config/TypeormCustomLogger';
import { PostEntity } from '@src/database/entity/Post/Post.entity';
import { PostFoamEntity } from '@src/database/entity/Post/PostFoam.entity';
import { PostHousingEntity } from '@src/database/entity/Post/PostHousing.entity';
import { PostImageEntity } from '@src/database/entity/Post/PostImage.entity';
import { PostKeyboardDefinitionEntity } from '@src/database/entity/Post/PostKeyboardDefinition.entity';
import { PostKeycapEntity } from '@src/database/entity/Post/PostKeycap.entity';
import { PostPlateEntity } from '@src/database/entity/Post/PostPlate.entity';
import { PostPrintedCircuitBoardEntity } from '@src/database/entity/Post/PostPrintedCircuitBoard.entity';
import { PostStabilizerEntity } from '@src/database/entity/Post/PostStabilizer.entity';
import { PostSwitchEntity } from '@src/database/entity/Post/PostSwitch.entity';
import { PostVideoEntity } from '@src/database/entity/Post/PostVideo.entity';
import { UserEntity } from '@src/database/entity/User/User.entity';
import { UserTokenEntity } from '@src/database/entity/User/UserToken.entity';

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
      entities: [
        UserEntity,
        UserTokenEntity,
        PostEntity,
        PostFoamEntity,
        PostHousingEntity,
        PostImageEntity,
        PostKeyboardDefinitionEntity,
        PostKeycapEntity,
        PostPlateEntity,
        PostPrintedCircuitBoardEntity,
        PostStabilizerEntity,
        PostSwitchEntity,
        PostVideoEntity,
      ],
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
