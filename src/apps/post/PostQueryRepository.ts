import { Repository } from 'typeorm';

import { CustomRepository } from '@src/libs/entity/decorators/TypeOrmCustomRepository.decorator';
import { PostEntity } from '@src/libs/entity/domain/post/Post.entity';

@CustomRepository(PostEntity)
export class PostQueryRepository extends Repository<PostEntity> {
  async findPostById(postId: number): Promise<PostEntity> {
    const row = await this.createQueryBuilder('post')
      .select(['post.id', 'post.createdAt', 'post.postTitle', 'u.id', 'u.profileImg', 'u.nickname'])
      .leftJoin('post.postedUser', 'u')
      .where('post.id = :postId', { postId })
      .getOne();

    return row;
  }
}
