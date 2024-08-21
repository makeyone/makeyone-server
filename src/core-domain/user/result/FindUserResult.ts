import { UserGenderUnion } from '@src/core-enum/user/UserGender.enum';
import { UserRoleUnion } from '@src/core-enum/user/UserRole.enum';
import { UserSocialProviderUnion } from '@src/core-enum/user/UserSocialProvider.enum';

export class FindUserResult {
  id: number;
  createdAt: Date;
  isActive: boolean;
  role: UserRoleUnion;
  socialProvider: UserSocialProviderUnion;
  socialProviderId: string;
  email: string;
  nickname: string;
  profileImg: string | null;
  age: string | null;
  gender: UserGenderUnion;
  birthday: string | null;
  birthyear: string | null;
}
