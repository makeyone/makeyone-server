import { Repository } from 'typeorm';

import { CustomRepository } from '@src/libs/entity/decorators/TypeOrmCustomRepository.decorator';
import { PostKeyboardLayoutEntity } from '@src/libs/entity/domain/post/PostKeyboardLayout.entity';

@CustomRepository(PostKeyboardLayoutEntity)
export class PostKeyboardLayoutQueryRepository extends Repository<PostKeyboardLayoutEntity> {
  async findPostKeyboardLayoutByPostId(postId: number): Promise<PostKeyboardLayoutEntity> {
    const row = await this.createQueryBuilder('layout')
      .select(['layout.id', 'layout.keyboardLayout', 'layout.layoutOptions', 'layout.partsOnLayout'])
      .leftJoin('layout.post', 'post')
      .where('post.id = :postId', { postId })
      .getOne();

    return row;
  }
}
