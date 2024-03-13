import { Repository } from 'typeorm';

import { CustomRepository } from '@src/libs/entity/decorators/TypeOrmCustomRepository.decorator';
import { PostSettingEntity } from '@src/libs/entity/domain/post/PostSetting.entity';

@CustomRepository(PostSettingEntity)
export class PostSettingQueryRepository extends Repository<PostSettingEntity> {
  async findPostSettingByPostId(postId: number): Promise<PostSettingEntity> {
    const row = await this.createQueryBuilder('setting')
      .select(['setting.id', 'setting.isPublished'])
      .leftJoin('setting.post', 'post')
      .where('post.id = :postId', { postId })
      .getOne();

    return row;
  }
}
