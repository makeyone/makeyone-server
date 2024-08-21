import { UserRoleUnion } from '@src/core-enum/user/UserRole.enum';
import { UserSocialProviderUnion } from '@src/core-enum/user/UserSocialProvider.enum';

import { FindUserResult } from '@src/core-domain/user/result/FindUserResult';

export class FindMeRes {
  constructor(
    readonly id: number,
    readonly socialProvider: UserSocialProviderUnion,
    readonly email: string,
    readonly nickname: string,
    readonly profileImg: string,
    readonly role: UserRoleUnion,
    readonly isActive: boolean,
  ) {}

  static of(findMe: FindUserResult): FindMeRes {
    return new FindMeRes(
      findMe.id,
      findMe.socialProvider,
      findMe.email,
      findMe.nickname,
      findMe.profileImg,
      findMe.role,
      findMe.isActive,
    );
  }
}
