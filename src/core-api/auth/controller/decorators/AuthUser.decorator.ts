import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { AuthUserData } from '@src/core-domain/auth/data/AuthUserData';

export const AuthUser = createParamDecorator((_: unknown, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();
  const authUser: AuthUserData = req.user;
  return authUser;
});
