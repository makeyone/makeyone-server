import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AllowedRoles } from '@src/core-api/auth/controller/decorators/RoleGuard.decorator';
import { CoreErrorType } from '@src/core-api/support/error/CoreErrorType';

import { JwtVerify } from '@src/core-domain/jwt/Jwt.verify';
import { UserReader } from '@src/core-domain/user/User.reader';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtVerify: JwtVerify,
    private readonly userReader: UserReader,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<AllowedRoles>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const token = req.cookies[process.env.JWT_ACCESS_TOKEN_COOKIE_NAME];

    if (!token) {
      throw new UnauthorizedException(CoreErrorType.NOT_LOGGED_IN);
    }

    const decodedToken = this.jwtVerify.userAccessToken(token.toString());

    if (typeof decodedToken === 'object' && decodedToken.hasOwnProperty('id')) {
      const user = await this.userReader.findUserById(decodedToken.id);
      if (!user) {
        throw new UnauthorizedException(CoreErrorType.NON_EXISTENT_USER);
      }

      if (user.isActive === false) {
        throw new UnauthorizedException(CoreErrorType.NOT_ACTIVED_USER);
      }

      if ((roles.includes(user.role) || roles.includes('ANY')) === false) {
        throw new UnauthorizedException(CoreErrorType.DO_NOT_HAVE_PERMISSION);
      }

      req.user = user;
      return true;
    }
  }
}
