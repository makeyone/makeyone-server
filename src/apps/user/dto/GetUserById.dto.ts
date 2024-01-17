import { IsNumber } from 'class-validator';

import { CoreOutput } from '@src/libs/entity/domain/common/Core.dto';
import { UserEntity } from '@src/libs/entity/domain/user/User.entity';

export class GetUserByIdParam {
  @IsNumber()
  userId: number;
}

export class GetUserByIdOutput extends CoreOutput {
  user?: Pick<UserEntity, 'id' | 'socialProvider' | 'email' | 'nickname' | 'profileImg' | 'role'>;
}
