import { Repository } from 'typeorm';

import { EditPostPlateData } from '@src/core/core-domain/domain/post/data/EditPostPlateData';

import { CustomRepository } from '@src/database/decorator/TypeOrmCustomRepository.decorator';
import { PostPlateEntity } from '@src/database/entity/Post/PostPlate.entity';

@CustomRepository(PostPlateEntity)
export class PostPlateRepository extends Repository<PostPlateEntity> {
  async findPlate(postId: number): Promise<PostPlateEntity> {
    const row = await this.createQueryBuilder('plate')
      .select([
        'plate.id',
        'plate.plateName',
        'plate.plateTexture',
        'plate.isFlexCutPlate',
        'plate.isHalfPlate',
        'plate.remark',
      ])
      .leftJoin('plate.post', 'post')
      .where('post.id = :postId', { postId })
      .getOne();

    return row;
  }

  async editPostPlate(
    targetPostId: number,
    { plateName, plateTexture, isFlexCutPlate, isHalfPlate, remark }: EditPostPlateData,
  ): Promise<void> {
    const plate = await this.findPlate(targetPostId);

    if (plate) {
      await this.update(
        { post: { id: targetPostId } },
        {
          plateName,
          plateTexture,
          isFlexCutPlate,
          isHalfPlate,
          remark: remark || '',
        },
      );
    }

    if (!plate) {
      await this.save(
        this.create({
          plateName,
          plateTexture,
          isFlexCutPlate,
          isHalfPlate,
          remark: remark || '',
          post: { id: targetPostId },
        }),
      );
    }
  }

  async deletePostPlate(targetPostId: number): Promise<void> {
    const plate = await this.findPlate(targetPostId);

    if (plate) {
      await this.delete({ post: { id: targetPostId } });
    }
  }
}
