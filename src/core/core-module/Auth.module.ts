import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthController } from '@src/core/core-api/controller/auth/v1/Auth.controller';
import { AuthGuard } from '@src/core/core-api/guard/auth/Auth.guard';

import { AuthProcessor } from '@src/core/core-domain/domain/auth/Auth.processor';
import { AuthService } from '@src/core/core-domain/domain/auth/Auth.service';
import { JwtRemover } from '@src/core/core-domain/domain/jwt/Jwt.remover';
import { JwtService } from '@src/core/core-domain/domain/jwt/Jwt.service';
import { JwtSetter } from '@src/core/core-domain/domain/jwt/Jwt.setter';
import { JwtSign } from '@src/core/core-domain/domain/jwt/Jwt.sign';
import { JwtVerify } from '@src/core/core-domain/domain/jwt/Jwt.verify';
import { UserCreator } from '@src/core/core-domain/domain/user/User.creator';
import { UserEditor } from '@src/core/core-domain/domain/user/User.editor';
import { UserReader } from '@src/core/core-domain/domain/user/User.reader';
import { UserService } from '@src/core/core-domain/domain/user/User.service';
import { UserValidator } from '@src/core/core-domain/domain/user/User.validator';
import { UserTokenCreator } from '@src/core/core-domain/domain/user/UserToken.creator';
import { UserTokenReader } from '@src/core/core-domain/domain/user/UserToken.reader';
import { UserTokenRemover } from '@src/core/core-domain/domain/user/UserToken.remover';
import { UserTokenService } from '@src/core/core-domain/domain/user/UserToken.service';
import { UserTokenVerify } from '@src/core/core-domain/domain/user/UserToken.verify';

import { UserTokenCron } from '@src/core/core-cron/user/UserToken.cron';

import { UserRepository } from '@src/database/entity/User/User.repository';
import { UserTokenRepository } from '@src/database/entity/User/UserToken.repository';
import { TypeormEntityModule } from '@src/database/TypeormEntity.module';

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
    UserValidator,
    UserEditor,
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
