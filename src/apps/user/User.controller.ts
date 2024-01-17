import { Controller, Get, Param, Query, ValidationPipe } from '@nestjs/common';

import { UserEntity } from '@src/libs/entity/domain/user/User.entity';

import { AuthUser } from '@src/apps/auth/decorators/AuthUser.decorator';
import { RoleGuard } from '@src/apps/auth/decorators/RoleGuard.decorator';
import { GetMeOutput } from '@src/apps/user/dto/GetMe.dto';
import { GetUserByEmailOutput, GetUserByEmailQuery } from '@src/apps/user/dto/GetUserByEmail.dto';
import { GetUserByIdOutput, GetUserByIdParam } from '@src/apps/user/dto/GetUserById.dto';
import { UserService } from '@src/apps/user/User.service';

@Controller('v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  async getMe(@AuthUser() authUser: UserEntity): Promise<GetMeOutput> {
    return await this.userService.getMe(authUser);
  }

  @RoleGuard(['ADMIN'])
  @Get('/:userId')
  async getUserById(@Param(ValidationPipe) getUserByIdParam: GetUserByIdParam): Promise<GetUserByIdOutput> {
    return await this.userService.getUserById(getUserByIdParam);
  }

  @RoleGuard(['ADMIN'])
  @Get('/')
  async getUserByEmail(@Query(ValidationPipe) getUserByEmailQuery: GetUserByEmailQuery): Promise<GetUserByEmailOutput> {
    return await this.userService.getUserByEmail(getUserByEmailQuery);
  }
}
