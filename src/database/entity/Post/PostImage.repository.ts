import { Repository } from 'typeorm';

import { CustomRepository } from '@src/database/decorator/TypeOrmCustomRepository.decorator';
import { PostImageEntity } from '@src/database/entity/Post/PostImage.entity';

import { EditPostImageData } from '@src/core-domain/post/data/EditPostImageData';

@CustomRepository(PostImageEntity)
export class PostImageRepository extends Repository<PostImageEntity> {
  async findImageList(postId: number): Promise<PostImageEntity[]> {
    const rows = await this.createQueryBuilder('image')
      .select(['image.id', 'image.imageUrl'])
      .leftJoin('image.post', 'post')
      .where('post.id = :postId', { postId })
      .getMany();

    return rows;
  }

  async editPostImageList(targetPostId: number, imageList: EditPostImageData[]): Promise<void> {
    await this.delete({ post: { id: targetPostId } });
    for (const image of imageList) {
      await this.save(
        this.create({
          imageUrl: image.imageUrl,
          post: {
            id: targetPostId,
          },
        }),
      );
    }
  }
}
