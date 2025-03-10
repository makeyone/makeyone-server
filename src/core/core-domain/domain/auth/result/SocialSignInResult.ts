import { UserGenderUnion } from '@src/core/core-enum/user/UserGender.enum';

export class SocialSignInResult {
  constructor(
    readonly socialProviderId: string,
    readonly nickname: string,
    readonly profileImg: string | null,
    readonly gender: UserGenderUnion | null,
    readonly age: string | null,
    readonly birthday: string | null,
    readonly birthyear: string | null,
  ) {}
}
