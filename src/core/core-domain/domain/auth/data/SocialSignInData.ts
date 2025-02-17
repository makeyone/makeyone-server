import { UserSocialProviderUnion } from '@src/core/core-enum/user/UserSocialProvider.enum';

export class SocialSignInData {
  constructor(readonly socialProvider: UserSocialProviderUnion, readonly accessToken: string) {}
}
