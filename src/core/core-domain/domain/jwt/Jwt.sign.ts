import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { JWT_CONFIG_OPTIONS, JwtModuleOptions } from '@src/core/core-module/JwtModuleOption';

@Injectable()
export class JwtSign {
  constructor(@Inject(JWT_CONFIG_OPTIONS) private readonly options: JwtModuleOptions) {}

  userAccessToken(userId: number): string {
    const { accessTokenSecretKey, accessTokenExpiresIn } = this.options;

    return jwt.sign({ id: userId }, accessTokenSecretKey, {
      expiresIn: parseInt(accessTokenExpiresIn, 10),
    });
  }

  userRefreshToken(userId: number): string {
    const { refreshTokenSecretKey, refreshTokenExpiresIn } = this.options;

    return jwt.sign({ id: userId }, refreshTokenSecretKey, {
      expiresIn: parseInt(refreshTokenExpiresIn, 10),
    });
  }
}
