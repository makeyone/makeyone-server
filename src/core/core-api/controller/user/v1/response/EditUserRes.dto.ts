import { UserRoleUnion } from '@src/core/core-enum/user/UserRole.enum';
import { UserSocialProviderUnion } from '@src/core/core-enum/user/UserSocialProvider.enum';

import { FindUserResult } from '@src/core/core-domain/domain/user/result/FindUserResult';

export class EditUserRes {
  constructor(
    readonly id: number,
    readonly socialProvider: UserSocialProviderUnion,
    readonly email: string,
    readonly nickname: string,
    readonly profileImg: string,
    readonly role: UserRoleUnion,
    readonly isActive: boolean,
  ) {}

  static of(editedMe: FindUserResult): EditUserRes {
    return new EditUserRes(
      editedMe.id,
      editedMe.socialProvider,
      editedMe.email,
      editedMe.nickname,
      editedMe.profileImg,
      editedMe.role,
      editedMe.isActive,
    );
  }
}
