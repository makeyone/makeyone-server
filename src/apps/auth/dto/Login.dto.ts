import { IsEmail, IsIn, IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { CoreOutput } from '@src/libs/entity/domain/common/Core.dto';
import { UserSocialProviderUnion, userSocialProviderKeys } from '@src/libs/entity/domain/user/enums/UserSocialProvider.enum';
import { UserEntity } from '@src/libs/entity/domain/user/User.entity';

export class LoginInput {
  @IsIn(userSocialProviderKeys)
  socialProvider: UserSocialProviderUnion;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  accessToken: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(254)
  email: string;
}

export class LoginOutput extends CoreOutput {
  loggedInUser?: Pick<UserEntity, 'id' | 'socialProvider' | 'email' | 'nickname' | 'profileImg' | 'role'>;
}
