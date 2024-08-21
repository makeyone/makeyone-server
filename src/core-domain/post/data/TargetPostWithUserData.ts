import { UserRoleUnion } from '@src/core-enum/user/UserRole.enum';

import { AuthUserData } from '@src/core-domain/auth/data/AuthUserData';

export class TargetPostWithUserData {
  constructor(readonly targetPostId: number, readonly postedUserId: number, readonly userRole: UserRoleUnion) {}

  static toTargetPostWithUser(targetPostId: number, authUser: AuthUserData): TargetPostWithUserData {
    return new TargetPostWithUserData(targetPostId, authUser.id, authUser.role);
  }
}
