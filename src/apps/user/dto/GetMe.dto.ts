import { CoreOutput } from '@src/libs/entity/domain/common/Core.dto';
import { UserEntity } from '@src/libs/entity/domain/user/User.entity';

export class GetMeOutput extends CoreOutput {
  me?: Pick<UserEntity, 'id' | 'socialProvider' | 'email' | 'nickname' | 'profileImg' | 'role'>;
}
