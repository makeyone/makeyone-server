import { UserRoleUnion } from '@src/core/core-enum/user/UserRole.enum';

export class ValidateUserIfNotAdminData {
  constructor(readonly myUserId: number, readonly targetUserId: number, readonly myUserRole: UserRoleUnion) {}
}
