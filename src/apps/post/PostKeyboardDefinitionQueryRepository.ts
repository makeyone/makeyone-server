import { Repository } from 'typeorm';

import { CustomRepository } from '@src/libs/entity/decorators/TypeOrmCustomRepository.decorator';
import { PostKeyboardDefinitionEntity } from '@src/libs/entity/domain/post/PostKeyboardDefinition.entity';

@CustomRepository(PostKeyboardDefinitionEntity)
export class PostKeyboardDefinitionQueryRepository extends Repository<PostKeyboardDefinitionEntity> {
  async findPostKeyboardDefinitionByPostId(postId: number): Promise<PostKeyboardDefinitionEntity> {
    const row = await this.createQueryBuilder('definition')
      .select(['definition.id', 'definition.keyboardDefinition', 'definition.layoutOptionKeys'])
      .leftJoin('definition.post', 'post')
      .where('post.id = :postId', { postId })
      .getOne();

    return row;
  }
}
