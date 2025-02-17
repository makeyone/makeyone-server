import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class JwtRemover {
  constructor() {}

  clearAccessTokenAndRefreshTokenCookies(res: Response): void {
    res.clearCookie(process.env.JWT_ACCESS_TOKEN_COOKIE_NAME, {
      ...(process.env.COOKIE_DOMAIN !== 'localhost.com' && { secure: true, sameSite: 'none' }),
      domain: process.env.COOKIE_DOMAIN,
    });
    res.clearCookie(process.env.JWT_REFRESH_TOKEN_COOKIE_NAME, {
      ...(process.env.COOKIE_DOMAIN !== 'localhost.com' && { secure: true, sameSite: 'none' }),
      domain: process.env.COOKIE_DOMAIN,
    });
  }
}
