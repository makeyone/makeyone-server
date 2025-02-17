import { UserRoleUnion } from '@src/core/core-enum/user/UserRole.enum';
import { UserSocialProviderUnion } from '@src/core/core-enum/user/UserSocialProvider.enum';

export class SignInUserResult {
  constructor(
    readonly id: number,
    readonly socialProvider: UserSocialProviderUnion,
    readonly email: string,
    readonly nickname: string,
    readonly profileImg: string,
    readonly role: UserRoleUnion,
    readonly accessToken: string,
    readonly refreshToken: string,
  ) {}
}
