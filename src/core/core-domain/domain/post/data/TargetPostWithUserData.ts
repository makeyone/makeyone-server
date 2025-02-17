import { UserRoleUnion } from '@src/core/core-enum/user/UserRole.enum';

import { FindUserResult } from '@src/core/core-domain/domain/user/result/FindUserResult';

export class TargetPostWithUserData {
  constructor(readonly targetPostId: number, readonly postedUserId: number, readonly userRole: UserRoleUnion) {}

  static toTargetPostWithUser(targetPostId: number, authUser: FindUserResult): TargetPostWithUserData {
    return new TargetPostWithUserData(targetPostId, authUser.id, authUser.role);
  }
}
