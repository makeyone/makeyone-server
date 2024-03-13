import { Repository } from 'typeorm';

import { CustomRepository } from '@src/libs/entity/decorators/TypeOrmCustomRepository.decorator';
import { PostFoamEntity } from '@src/libs/entity/domain/post/PostFoam.entity';

@CustomRepository(PostFoamEntity)
export class PostFoamQueryRepository extends Repository<PostFoamEntity> {
  async findPostFoamByPostId(postId: number): Promise<PostFoamEntity> {
    const row = await this.createQueryBuilder('foam')
      .select([
        'foam.id',
        'foam.plateBetweenPCBFoam',
        'foam.bottomSwitchPEFoam',
        'foam.bottomFoam',
        'foam.tapeMod',
        'foam.remark',
      ])
      .leftJoin('foam.post', 'post')
      .where('post.id = :postId', { postId })
      .getOne();

    return row;
  }
}
