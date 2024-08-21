import { DynamicModule, Global, Module } from '@nestjs/common';

import { UserRepository } from '@src/database/entity/User/User.repository';
import { TypeormEntityModule } from '@src/database/TypeormEntity.module';

import { JWT_CONFIG_OPTIONS, JwtModuleOptions } from '@src/core-module/JwtModuleOption';

import { JwtService } from '@src/core-domain/jwt/Jwt.service';
import { JwtSetter } from '@src/core-domain/jwt/Jwt.setter';
import { JwtSign } from '@src/core-domain/jwt/Jwt.sign';
import { JwtVerify } from '@src/core-domain/jwt/Jwt.verify';
import { UserReader } from '@src/core-domain/user/User.reader';

@Module({})
@Global()
export class JwtModule {
  static forRoot(options: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      imports: [TypeormEntityModule.forCustomRepository([UserRepository])],
      providers: [
        {
          provide: JWT_CONFIG_OPTIONS,
          useValue: options,
        },
        JwtService,
        JwtSign,
        JwtVerify,
        JwtSetter,
        UserReader,
      ],
      exports: [
        {
          provide: JWT_CONFIG_OPTIONS,
          useValue: options,
        },
        JwtService,
        JwtSign,
        JwtVerify,
        JwtSetter,
        UserReader,
      ],
    };
  }
}
