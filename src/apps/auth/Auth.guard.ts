import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AllowedRoles } from '@src/apps/auth/decorators/RoleGuard.decorator';
import { JwtService } from '@src/apps/jwt/Jwt.service';
import { UserService } from '@src/apps/user/User.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<AllowedRoles>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const token = req.cookies['accessToken'];

    if (!token) {
      throw new UnauthorizedException('NOT_LOGGED_IN');
    }

    const decodedToken = this.jwtService.verifyAccessToken(token.toString());

    if (typeof decodedToken === 'object' && decodedToken.hasOwnProperty('id')) {
      const { user } = await this.userService.getUserById({ userId: decodedToken.id });
      if (!user) {
        throw new NotFoundException('USER_NOT_FOUND');
      }

      if ((roles.includes(user.role) || roles.includes('ANY')) === false) {
        throw new UnauthorizedException('DO_NOT_HAVE_PERMISSION');
      }

      req.user = user;
      return true;
    }
  }
}
