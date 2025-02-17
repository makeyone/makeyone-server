import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { FindUserResult } from '@src/core/core-domain/domain/user/result/FindUserResult';

export const AuthUser = createParamDecorator((_: unknown, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();
  const authUser: FindUserResult = req.user;
  return authUser;
});
