import { Body, Controller, Get, Param, Patch } from '@nestjs/common';

import { EditUserParam, EditUserReq } from '@src/core/core-api/controller/user/v1/request/EditUserReq.dto';
import { FindUserByIdParam } from '@src/core/core-api/controller/user/v1/request/FindUserByIdReq.dto';
import { EditUserRes } from '@src/core/core-api/controller/user/v1/response/EditUserRes.dto';
import { FindMeRes } from '@src/core/core-api/controller/user/v1/response/FindMeRes.dto';
import { FindUserByIdRes } from '@src/core/core-api/controller/user/v1/response/FindUserByIdRes.dto';
import { AuthUser } from '@src/core/core-api/decorator/auth/AuthUser.decorator';
import { RoleGuard } from '@src/core/core-api/decorator/auth/RoleGuard.decorator';
import { ApiResponse } from '@src/core/core-api/support/response/ApiResponse';

import { FindUserResult } from '@src/core/core-domain/domain/user/result/FindUserResult';
import { UserService } from '@src/core/core-domain/domain/user/User.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/v1/users/me')
  async findMe(@AuthUser() authUser: FindUserResult): Promise<ApiResponse<FindMeRes>> {
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

  @RoleGuard(['ANY'])
  @Patch('/v1/users/:userId')
  async editUser(
    @AuthUser() authUser: FindUserResult,
    @Param() { userId }: EditUserParam,
    @Body() request: EditUserReq,
  ): Promise<ApiResponse<EditUserRes>> {
    const result = await this.userService.editUser(authUser.id, authUser.role, request.toEditUserData(userId));
    return ApiResponse.successWithData(EditUserRes.of(result));
  }
}
