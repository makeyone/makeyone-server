import { Repository } from 'typeorm';

import { CustomRepository } from '@src/database/decorator/TypeOrmCustomRepository.decorator';
import { PostHousingEntity } from '@src/database/entity/Post/PostHousing.entity';

import { EditPostHousingData } from '@src/core-domain/post/data/EditPostHousingData';

@CustomRepository(PostHousingEntity)
export class PostHousingRepository extends Repository<PostHousingEntity> {
  async findHousing(postId: number): Promise<PostHousingEntity> {
    const row = await this.createQueryBuilder('housing')
      .select([
        'housing.id',
        'housing.housingName',
        'housing.housingColor',
        'housing.housingMount',
        'housing.housingLayout',
        'housing.housingWindowKeyLayout',
        'housing.housingFunctionKeyLayout',
        'housing.isHousingReAnodized',
      ])
      .leftJoin('housing.post', 'post')
      .where('post.id = :postId', { postId })
      .getOne();

    if (!row) {
      return null;
    }

    return row;
  }

  async editPostHousing(targetPostId: number, editPostHousingData: EditPostHousingData): Promise<void> {
    const housing = await this.findHousing(targetPostId);

    if (housing) {
      await this.update({ post: { id: targetPostId } }, editPostHousingData);
    }

    if (!housing) {
      await this.save(
        this.create({
          ...editPostHousingData,
          post: { id: targetPostId },
        }),
      );
    }
  }
}
