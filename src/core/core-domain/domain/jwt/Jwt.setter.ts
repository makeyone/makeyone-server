import { Injectable } from '@nestjs/common';
import { Response } from 'express';

import { SetRefreshTokenAndAccessTokenData } from '@src/core/core-domain/domain/jwt/data/SetRefreshTokenAndAccessTokenData';

@Injectable()
export class JwtSetter {
  constructor() {}

  setRefreshTokenAndAccessToken(
    res: Response,
    setRefreshTokenAndAccessTokenData: SetRefreshTokenAndAccessTokenData,
  ): void {
    const { accessToken, refreshToken } = setRefreshTokenAndAccessTokenData;

    res.setHeader('Authorization', 'Bearer ' + [accessToken, refreshToken]);
    res.cookie(process.env.JWT_ACCESS_TOKEN_COOKIE_NAME, accessToken, {
      ...(process.env.COOKIE_DOMAIN.indexOf('localhost') === -1 && { secure: true, sameSite: 'none' }),
      domain: process.env.COOKIE_DOMAIN,
      expires: new Date(Date.now() + parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRES_IN, 10) * 1000),
    });
    res.cookie(process.env.JWT_REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
      ...(process.env.COOKIE_DOMAIN.indexOf('localhost') === -1 && { secure: true, sameSite: 'none' }),
      domain: process.env.COOKIE_DOMAIN,
      expires: new Date(Date.now() + parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN, 10) * 1000),
    });
  }

  setAccessToken(res: Response, accessToken: string): void {
    res.setHeader('Authorization', 'Bearer ' + accessToken);
    res.cookie(process.env.JWT_ACCESS_TOKEN_COOKIE_NAME, accessToken, {
      ...(process.env.COOKIE_DOMAIN.indexOf('localhost') === -1 && { secure: true, sameSite: 'none' }),
      domain: process.env.COOKIE_DOMAIN,
      expires: new Date(Date.now() + parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRES_IN, 10) * 1000),
    });
  }
}
