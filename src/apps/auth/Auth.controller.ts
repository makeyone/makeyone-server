import { Body, Controller, Post, Res, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';

import { UserEntity } from '@src/libs/entity/domain/user/User.entity';

import { AuthService } from '@src/apps/auth/Auth.service';
import { AuthUser } from '@src/apps/auth/decorators/AuthUser.decorator';
import { RoleGuard } from '@src/apps/auth/decorators/RoleGuard.decorator';
import { LoginInput, LoginOutput } from '@src/apps/auth/dto/Login.dto';
import { LogoutOutput } from '@src/apps/auth/dto/Logout.dto';
import { RefreshTokenInput, RefreshTokenOutput } from '@src/apps/auth/dto/RefreshToken.dto';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Res({ passthrough: true }) res: Response, @Body(ValidationPipe) loginInput: LoginInput): Promise<LoginOutput> {
    return await this.authService.login(res, loginInput);
  }

  @RoleGuard(['ANY'])
  @Post('/logout')
  async logout(@Res({ passthrough: true }) res: Response, @AuthUser() authUser: UserEntity): Promise<LogoutOutput> {
    return await this.authService.logout(res, authUser);
  }

  @Post('/refresh-token')
  async refreshToken(
    @Res({ passthrough: true }) res: Response,
    @Body(ValidationPipe) refreshTokenInput: RefreshTokenInput,
  ): Promise<RefreshTokenOutput> {
    return await this.authService.refreshToken(res, refreshTokenInput);
  }
}
