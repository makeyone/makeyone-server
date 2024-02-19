import { Repository } from 'typeorm';

import { CustomRepository } from '@src/libs/entity/decorators/TypeOrmCustomRepository.decorator';
import { PostSwitchEntity } from '@src/libs/entity/domain/post/PostSwitch.entity';

@CustomRepository(PostSwitchEntity)
export class PostSwitchQueryRepository extends Repository<PostSwitchEntity> {}
