import { Repository } from 'typeorm';

import { CustomRepository } from '@src/libs/entity/decorators/TypeOrmCustomRepository.decorator';
import { PostSwitchEntity } from '@src/libs/entity/domain/post/PostSwitch.entity';

@CustomRepository(PostSwitchEntity)
export class PostSwitchQueryRepository extends Repository<PostSwitchEntity> {
  async findPostSwitchesByPostId(postId: number): Promise<PostSwitchEntity[]> {
    const rows = await this.createQueryBuilder('switch')
      .select([
        'switch.id',
        'switch.switchName',
        'switch.switchType',
        'switch.isSlientSwitch',
        'switch.switchLube',
        'switch.bottomOutForce',
        'switch.springLength',
        'switch.switchFilm',
        'switch.remark',
      ])
      .leftJoin('switch.post', 'post')
      .where('post.id = :postId', { postId })
      .getMany();
    return rows;
  }
}
