import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { JWT_CONFIG_OPTIONS } from '@src/apps/jwt/Jwt.constants';
import { JwtAccessTokenSignPayload, JwtModuleOptions, JwtRefreshTokenSignPayload } from '@src/apps/jwt/Jwt.interface';

@Injectable()
export class JwtService {
  constructor(@Inject(JWT_CONFIG_OPTIONS) private readonly options: JwtModuleOptions) {}

  async signAccessToken({ id }: JwtAccessTokenSignPayload): Promise<string> {
    return jwt.sign({ id }, this.options.accessTokenSecretKey, {
      expiresIn: parseInt(this.options.accessTokenExpiresIn, 10),
    });
  }

  async signRefreshToken({ id }: JwtRefreshTokenSignPayload): Promise<string> {
    return jwt.sign({ id }, this.options.refreshTokenSecretKey, {
      expiresIn: parseInt(this.options.refreshTokenExpiresIn, 10),
    });
  }

  verifyAccessToken(token: string): string | jwt.JwtPayload {
    try {
      return jwt.verify(token, this.options.accessTokenSecretKey);
    } catch (err) {
      if (err.message === 'invalid token') {
        throw new ForbiddenException('INVALID_TOKEN');
      }

      if (err.message === 'jwt expired') {
        throw new ForbiddenException('EXPIRED_TOKEN');
      }
    }
  }

  async verifyRefreshToken(refreshToken: string): Promise<string | jwt.JwtPayload> {
    try {
      return jwt.verify(refreshToken, this.options.refreshTokenSecretKey);
    } catch (err) {
      if (err.message === 'invalid token') {
        throw new ForbiddenException('INVALID_TOKEN');
      }

      if (err.message === 'jwt expired') {
        throw new ForbiddenException('EXPIRED_TOKEN');
      }
    }
  }
}
