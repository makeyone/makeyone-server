import { DynamicModule, Global, Module } from '@nestjs/common';

import { JWT_CONFIG_OPTIONS } from '@src/apps/jwt/Jwt.constants';
import { JwtModuleOptions } from '@src/apps/jwt/Jwt.interface';
import { JwtService } from '@src/apps/jwt/Jwt.service';

@Module({})
@Global()
export class JwtModule {
  static forRoot(options: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      providers: [
        {
          provide: JWT_CONFIG_OPTIONS,
          useValue: options,
        },
        JwtService,
      ],
      exports: [JwtService],
    };
  }
}
