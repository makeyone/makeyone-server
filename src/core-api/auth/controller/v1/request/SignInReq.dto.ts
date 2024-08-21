import { IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator';

import { userSocialProviderKeys, UserSocialProviderUnion } from '@src/core-enum/user/UserSocialProvider.enum';

import { SocialSignInData } from '@src/core-domain/auth/data/SocialSignInData';

export class SignInReq {
  @IsIn(userSocialProviderKeys)
  socialProvider: UserSocialProviderUnion;

  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  toSocialSignIn(): SocialSignInData {
    return new SocialSignInData(this.socialProvider, this.accessToken);
  }
}
