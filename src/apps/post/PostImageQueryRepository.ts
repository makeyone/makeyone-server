import { Repository } from 'typeorm';

import { CustomRepository } from '@src/libs/entity/decorators/TypeOrmCustomRepository.decorator';
import { PostImageEntity } from '@src/libs/entity/domain/post/PostImage.entity';

@CustomRepository(PostImageEntity)
export class PostImageQueryRepository extends Repository<PostImageEntity> {
  // async findPostImagesByPostId(postId: number): Promise<PostImageEntity[]> {
  //   const rows = await this.createQueryBuilder('postImage')
  //     .select(['post.id', 'post.imageUrl'])
  //     .leftJoin('postImage.post', 'post')
  //     .where('post.id = :postId', { postId })
  //     .getMany();
  //   return rows;
  // }
}
