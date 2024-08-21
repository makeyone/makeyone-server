import { UserRoleUnion } from '@src/core-enum/user/UserRole.enum';
import { UserSocialProviderUnion } from '@src/core-enum/user/UserSocialProvider.enum';

export class SignInUserResult {
  id: number;
  socialProvider: UserSocialProviderUnion;
  email: string;
  nickname: string;
  profileImg: string;
  role: UserRoleUnion;
  accessToken: string;
  refreshToken: string;
}
