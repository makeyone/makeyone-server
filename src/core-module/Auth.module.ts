import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UserTokenCron } from '@src/cron/user/UserToken.cron';

import { UserRepository } from '@src/database/entity/User/User.repository';
import { UserTokenRepository } from '@src/database/entity/User/UserToken.repository';
import { TypeormEntityModule } from '@src/database/TypeormEntity.module';

import { AuthGuard } from '@src/core-api/auth/controller/Auth.guard';
import { AuthController } from '@src/core-api/auth/controller/v1/Auth.controller';

import { AuthProcessor } from '@src/core-domain/auth/Auth.processor';
import { AuthService } from '@src/core-domain/auth/Auth.service';
import { JwtRemover } from '@src/core-domain/jwt/Jwt.remover';
import { JwtService } from '@src/core-domain/jwt/Jwt.service';
import { JwtSetter } from '@src/core-domain/jwt/Jwt.setter';
import { JwtSign } from '@src/core-domain/jwt/Jwt.sign';
import { JwtVerify } from '@src/core-domain/jwt/Jwt.verify';
import { UserCreator } from '@src/core-domain/user/User.creator';
import { UserReader } from '@src/core-domain/user/User.reader';
import { UserService } from '@src/core-domain/user/User.service';
import { UserTokenCreator } from '@src/core-domain/user/UserToken.creator';
import { UserTokenReader } from '@src/core-domain/user/UserToken.reader';
import { UserTokenRemover } from '@src/core-domain/user/UserToken.remover';
import { UserTokenService } from '@src/core-domain/user/UserToken.service';
import { UserTokenVerify } from '@src/core-domain/user/UserToken.verify';

@Module({
  imports: [TypeormEntityModule.forCustomRepository([UserRepository, UserTokenRepository])],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthProcessor,
    JwtService,
    UserService,
    UserTokenService,
    UserTokenCron,
    UserTokenReader,
    UserReader,
    UserCreator,
    UserTokenCreator,
    UserTokenVerify,
    UserTokenRemover,
    JwtSign,
    JwtSetter,
    JwtVerify,
    JwtRemover,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
