import { Controller, Get, Param } from '@nestjs/common';

import { AuthUser } from '@src/core-api/auth/controller/decorators/AuthUser.decorator';
import { RoleGuard } from '@src/core-api/auth/controller/decorators/RoleGuard.decorator';
import { ApiResponse } from '@src/core-api/support/response/ApiResponse';
import { FindUserByIdParam } from '@src/core-api/user/controller/v1/request/FindUserByIdReq.dto';
import { FindMeRes } from '@src/core-api/user/controller/v1/response/FindMeRes.dto';
import { FindUserByIdRes } from '@src/core-api/user/controller/v1/response/FindUserByIdRes.dto';

import { AuthUserData } from '@src/core-domain/auth/data/AuthUserData';
import { UserService } from '@src/core-domain/user/User.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/v1/users/me')
  async findMe(@AuthUser() authUser: AuthUserData): Promise<ApiResponse<FindMeRes>> {
    if (!authUser) {
      return ApiResponse.success();
    }
    return ApiResponse.successWithData(FindMeRes.of(authUser));
  }

  @RoleGuard(['ADMIN'])
  @Get('/v1/users/:userId')
  async findUserById(@Param() { userId }: FindUserByIdParam): Promise<ApiResponse<FindUserByIdRes>> {
    const result = await this.userService.findUserById(userId);
    return ApiResponse.successWithData(FindUserByIdRes.of(result));
  }
}
