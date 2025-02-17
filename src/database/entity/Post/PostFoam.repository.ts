import { Repository } from 'typeorm';

import { EditPostFoamData } from '@src/core/core-domain/domain/post/data/EditPostFoamData';

import { CustomRepository } from '@src/database/decorator/TypeOrmCustomRepository.decorator';
import { PostFoamEntity } from '@src/database/entity/Post/PostFoam.entity';

@CustomRepository(PostFoamEntity)
export class PostFoamRepository extends Repository<PostFoamEntity> {
  async findFoam(postId: number): Promise<PostFoamEntity> {
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

  async editPostFoam(
    targetPostId: number,
    { plateBetweenPCBFoam, bottomSwitchPEFoam, bottomFoam, tapeMod, remark }: EditPostFoamData,
  ): Promise<void> {
    const foam = await this.findFoam(targetPostId);
    if (foam) {
      await this.update(
        { post: { id: targetPostId } },
        {
          plateBetweenPCBFoam,
          bottomSwitchPEFoam,
          bottomFoam,
          tapeMod,
          remark: remark || '',
        },
      );
    }

    if (!foam) {
      await this.save(
        this.create({
          plateBetweenPCBFoam,
          bottomSwitchPEFoam,
          bottomFoam,
          tapeMod,
          remark: remark || '',
          post: { id: targetPostId },
        }),
      );
    }
  }
}
