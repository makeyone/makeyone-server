import { SetMetadata } from '@nestjs/common';

import { UserRoleUnion } from '@src/libs/entity/domain/user/enums/UserRole.enum';

export type AllowedRoles = UserRoleUnion | 'ANY';

export const RoleGuard = (roles: AllowedRoles[]) => {
  return SetMetadata('roles', roles);
};
