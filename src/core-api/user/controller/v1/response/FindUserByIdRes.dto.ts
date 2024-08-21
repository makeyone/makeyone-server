import { UserRoleUnion } from '@src/core-enum/user/UserRole.enum';
import { UserSocialProviderUnion } from '@src/core-enum/user/UserSocialProvider.enum';

import { FindUserResult } from '@src/core-domain/user/result/FindUserResult';

export class FindUserByIdRes {
  constructor(
    readonly user: {
      id: number;
      socialProvider: UserSocialProviderUnion;
      email: string;
      nickname: string;
      profileImg: string;
      role: UserRoleUnion;
      isActive: boolean;
    },
  ) {}

  static of(findUser: FindUserResult): FindUserByIdRes {
    const user = {
      id: findUser.id,
      socialProvider: findUser.socialProvider,
      email: findUser.email,
      nickname: findUser.nickname,
      profileImg: findUser.profileImg,
      role: findUser.role,
      isActive: findUser.isActive,
    };
    return new FindUserByIdRes(user);
  }
}
