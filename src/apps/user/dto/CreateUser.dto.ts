import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, Matches, MaxLength } from 'class-validator';

import { CoreOutput } from '@src/libs/entity/domain/common/Core.dto';
import { UserGenderUnion, userGenderKeys } from '@src/libs/entity/domain/user/enums/UserGender.enum';
import { UserSocialProviderUnion, userSocialProviderKeys } from '@src/libs/entity/domain/user/enums/UserSocialProvider.enum';
import NicknameFormat from '@src/libs/entity/domain/user/formats/Nickname.format';
import { UserEntity } from '@src/libs/entity/domain/user/User.entity';

export class CreateUserInput {
  @IsIn(userSocialProviderKeys)
  socialProvider: UserSocialProviderUnion;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  socialProviderId: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(254)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @Matches(NicknameFormat)
  nickname: string;

  @IsIn(userGenderKeys)
  gender: UserGenderUnion;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  profileImg?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  age?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  birthday?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(4)
  birthyear?: string;
}

export class CreateUserOutput extends CoreOutput {
  createdUser?: Pick<UserEntity, 'id' | 'socialProvider' | 'email' | 'nickname' | 'profileImg'>;
}
