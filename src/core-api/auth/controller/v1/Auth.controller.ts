import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { SignInReq } from '@src/core-api/auth/controller/v1/request/SignInReq.dto';
import { RefreshJwtResDto } from '@src/core-api/auth/controller/v1/response/RefreshJwtRes.dto';
import { SignInRes } from '@src/core-api/auth/controller/v1/response/SignInRes.dto';
import { ApiResponse } from '@src/core-api/support/response/ApiResponse';

import { AuthService } from '@src/core-domain/auth/Auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/v1/auth/sign-in')
  async signIn(@Res({ passthrough: true }) res: Response, @Body() request: SignInReq): Promise<ApiResponse<SignInRes>> {
    const result = await this.authService.signIn(res, request.email, request.socialProvider, request.toSocialSignIn());
    return ApiResponse.successWithData(SignInRes.of(result));
  }

  @Post('/v1/auth/sign-out')
  async signOut(@Res({ passthrough: true }) res: Response): Promise<ApiResponse<null>> {
    await this.authService.signOut(res);
    return ApiResponse.success();
  }

  @Post('/v1/auth/refresh-token')
  async refreshJwt(@Res({ passthrough: true }) res: Response): Promise<ApiResponse<RefreshJwtResDto>> {
    const accessToken = await this.authService.refreshToken(res);
    return ApiResponse.successWithData(RefreshJwtResDto.of(accessToken));
  }
}
