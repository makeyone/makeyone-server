import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '@src/libs/entity/domain/user/User.entity';
import { UserTokenEntity } from '@src/libs/entity/domain/user/UserToken.entity';
import { EntityModule } from '@src/libs/entity/Entity.module';

import { AuthController } from '@src/apps/auth/Auth.controller';
import { JwtAuthGuard } from '@src/apps/auth/Auth.guard';
import { AuthService } from '@src/apps/auth/Auth.service';
import { UserService } from '@src/apps/user/User.service';
import { UserQueryRepository } from '@src/apps/user/UserQueryRepository';
import { UserTokenQueryRepository } from '@src/apps/user/UserTokenQueryRepository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserTokenEntity]),
    EntityModule.forCustomRepository([UserQueryRepository, UserTokenQueryRepository]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
