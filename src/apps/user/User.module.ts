import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '@src/libs/entity/domain/user/User.entity';
import { UserTokenEntity } from '@src/libs/entity/domain/user/UserToken.entity';
import { EntityModule } from '@src/libs/entity/Entity.module';

import { UserController } from '@src/apps/user/User.controller';
import { UserService } from '@src/apps/user/User.service';
import { UserQueryRepository } from '@src/apps/user/UserQueryRepository';
import { UserTokenQueryRepository } from '@src/apps/user/UserTokenQueryRepository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserTokenEntity]),
    EntityModule.forCustomRepository([UserQueryRepository, UserTokenQueryRepository]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
