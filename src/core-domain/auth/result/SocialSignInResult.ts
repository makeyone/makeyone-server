import { UserGenderUnion } from '@src/core-enum/user/UserGender.enum';

export class SocialSignInResult {
  socialProviderId: string;
  nickname: string;
  profileImg: string;
  gender: UserGenderUnion | null;
  age: string | null;
  birthday: string | null;
  birthyear: string | null;
}
