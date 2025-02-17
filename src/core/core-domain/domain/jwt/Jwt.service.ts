import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { JwtSign } from '@src/core/core-domain/domain/jwt/Jwt.sign';
import { JwtVerify } from '@src/core/core-domain/domain/jwt/Jwt.verify';

@Injectable()
export class JwtService {
  constructor(private readonly jwtSign: JwtSign, private readonly jwtVerify: JwtVerify) {}

  signUserAccessToken(userId: number): string {
    const accessToken = this.jwtSign.userAccessToken(userId);
    return accessToken;
  }

  signUserRefreshToken(userId: number): string {
    const refreshToken = this.jwtSign.userRefreshToken(userId);
    return refreshToken;
  }

  verifyUserAccessToken(token: string): string | jwt.JwtPayload {
    const result = this.jwtVerify.userAccessToken(token);
    return result;
  }

  verifyUserRefreshToken(token: string): string | jwt.JwtPayload {
    const result = this.jwtVerify.userRefreshToken(token);
    return result;
  }
}
