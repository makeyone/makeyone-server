import { IsNotEmpty, IsString } from 'class-validator';

import { CoreOutput } from '@src/libs/entity/domain/common/Core.dto';
import { UserEntity } from '@src/libs/entity/domain/user/User.entity';

export class GetUserByEmailQuery {
  @IsNotEmpty()
  @IsString()
  userEmail: string;
}

export class GetUserByEmailOutput extends CoreOutput {
  user?: Pick<UserEntity, 'id' | 'socialProvider' | 'email' | 'nickname' | 'profileImg' | 'role'>;
}
