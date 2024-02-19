import { Repository } from 'typeorm';

import { CustomRepository } from '@src/libs/entity/decorators/TypeOrmCustomRepository.decorator';
import { PostHousingEntity } from '@src/libs/entity/domain/post/PostHousing.entity';

@CustomRepository(PostHousingEntity)
export class PostHousingQueryRepository extends Repository<PostHousingEntity> {
  async findPostHousingByPostId(postId: number): Promise<PostHousingEntity> {
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

    return row;
  }
}
