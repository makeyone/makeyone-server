import { UserRoleUnion } from '@src/core-enum/user/UserRole.enum';
import { UserSocialProviderUnion } from '@src/core-enum/user/UserSocialProvider.enum';

import { SignInUserResult } from '@src/core-domain/auth/result/SignInUserResult';

export class SignInRes {
  constructor(
    readonly loggedInUser: {
      id: number;
      socialProvider: UserSocialProviderUnion;
      email: string;
      nickname: string;
      profileImg: string;
      role: UserRoleUnion;
    },
    readonly accessToken: string,
    readonly refreshToken: string,
  ) {}

  static of(signInUser: SignInUserResult): SignInRes {
    const loggedInUser = {
      id: signInUser.id,
      socialProvider: signInUser.socialProvider,
      email: signInUser.email,
      nickname: signInUser.nickname,
      profileImg: signInUser.profileImg,
      role: signInUser.role,
    };
    const accessToken = signInUser.accessToken;
    const refreshToken = signInUser.refreshToken;

    return new SignInRes(loggedInUser, accessToken, refreshToken);
  }
}
