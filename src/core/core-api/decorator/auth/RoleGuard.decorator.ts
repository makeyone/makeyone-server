import { SetMetadata } from '@nestjs/common';

import { UserRoleUnion } from '@src/core/core-enum/user/UserRole.enum';

export type AllowedRoles = UserRoleUnion | 'ANY';

export const RoleGuard = (roles: AllowedRoles[]) => {
  return SetMetadata('roles', roles);
};
