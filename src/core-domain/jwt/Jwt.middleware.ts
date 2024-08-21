import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { CoreErrorType } from '@src/core-api/support/error/CoreErrorType';

import { JwtVerify } from '@src/core-domain/jwt/Jwt.verify';
import { UserReader } from '@src/core-domain/user/User.reader';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtVerify: JwtVerify, private readonly userReader: UserReader) {}
  async use(req: Request, _res: Response, next: NextFunction) {
    if (
      process.env.JWT_ACCESS_TOKEN_COOKIE_NAME in req.cookies &&
      req.url.indexOf('/auth/sign-in') === -1 &&
      req.url.indexOf('/auth/sign-out') === -1 &&
      req.url.indexOf('/auth/refresh-token') === -1
    ) {
      const token = req.cookies[process.env.JWT_ACCESS_TOKEN_COOKIE_NAME];
      const decoded = this.jwtVerify.userAccessToken(token.toString());

      if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
        const user = await this.userReader.findUserById(decoded.id);

        if (!user) {
          throw new NotFoundException(CoreErrorType.USER_NOT_FOUND);
        }

        req['user'] = user;
      }
    }
    next();
  }
}
