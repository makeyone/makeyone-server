import { Repository } from 'typeorm';

import { CustomRepository } from '@src/libs/entity/decorators/TypeOrmCustomRepository.decorator';
import { UserTokenEntity } from '@src/libs/entity/domain/user/UserToken.entity';

@CustomRepository(UserTokenEntity)
export class UserTokenQueryRepository extends Repository<UserTokenEntity> {}
