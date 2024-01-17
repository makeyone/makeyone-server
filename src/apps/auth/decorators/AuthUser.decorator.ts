import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { UserEntity } from '@src/libs/entity/domain/user/User.entity';

export const AuthUser = createParamDecorator((_: unknown, context: ExecutionContext): UserEntity => {
  const req = context.switchToHttp().getRequest();

  return req.user;
});
