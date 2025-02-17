import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { JWT_CONFIG_OPTIONS, JwtModuleOptions } from '@src/core/core-module/JwtModuleOption';

import { CoreErrorType } from '@src/core/core-domain/support/error/CoreErrorType';

@Injectable()
export class JwtVerify {
  constructor(@Inject(JWT_CONFIG_OPTIONS) private readonly options: JwtModuleOptions) {}

  userAccessToken(token: string): string | jwt.JwtPayload {
    try {
      return jwt.verify(token, this.options.accessTokenSecretKey);
    } catch (err) {
      if (err.message === 'invalid token') {
        throw new UnauthorizedException(CoreErrorType.INVALID_JWT_ACCESS_TOKEN);
      }

      if (err.message === 'jwt expired') {
        throw new UnauthorizedException(CoreErrorType.EXPIRED_JWT_ACCESS_TOKEN);
      }
    }
  }

  userRefreshToken(refreshToken: string): string | jwt.JwtPayload {
    try {
      return jwt.verify(refreshToken, this.options.refreshTokenSecretKey);
    } catch (err) {
      if (err.message === 'invalid token') {
        throw new UnauthorizedException(CoreErrorType.INVALID_JWT_REFRESH_TOKEN);
      }

      if (err.message === 'jwt expired') {
        throw new UnauthorizedException(CoreErrorType.EXPIRED_JWT_REFRESH_TOKEN);
      }
    }
  }
}
