import { UserGenderUnion } from '@src/core-enum/user/UserGender.enum';
import { UserRoleUnion } from '@src/core-enum/user/UserRole.enum';
import { UserSocialProviderUnion } from '@src/core-enum/user/UserSocialProvider.enum';

export class AuthUserData {
  constructor(
    readonly id: number,
    readonly createdAt: Date,
    readonly isActive: boolean,
    readonly role: UserRoleUnion,
    readonly socialProvider: UserSocialProviderUnion,
    readonly socialProviderId: string,
    readonly email: string,
    readonly nickname: string,
    readonly profileImg: string | null,
    readonly age: string | null,
    readonly gender: UserGenderUnion,
    readonly birthday: string | null,
    readonly birthyear: string | null,
  ) {}
}
