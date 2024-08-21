import { UserGenderUnion } from '@src/core-enum/user/UserGender.enum';
import { UserSocialProviderUnion } from '@src/core-enum/user/UserSocialProvider.enum';

export class CreateUserData {
  constructor(
    readonly socialProvider: UserSocialProviderUnion,
    readonly socialProviderId: string,
    readonly email: string,
    readonly nickname: string,
    readonly gender: UserGenderUnion,
    readonly profileImg?: string,
    readonly age?: string,
    readonly birthday?: string,
    readonly birthyear?: string,
  ) {}
}
