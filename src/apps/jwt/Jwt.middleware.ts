import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { JwtService } from '@src/apps/jwt/Jwt.service';
import { UserService } from '@src/apps/user/User.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if ('accessToken' in req.cookies) {
      const token = req.cookies['accessToken'];
      try {
        const decoded = this.jwtService.verifyAccessToken(token.toString());
        if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
          const { user } = await this.userService.getUserById({ userId: decoded.id });

          if (user) {
            req['user'] = user;
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
    next();
  }
}
