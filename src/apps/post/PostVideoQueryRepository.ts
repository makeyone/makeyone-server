import { Repository } from 'typeorm';

import { CustomRepository } from '@src/libs/entity/decorators/TypeOrmCustomRepository.decorator';
import { PostVideoEntity } from '@src/libs/entity/domain/post/PostVideo.entity';

@CustomRepository(PostVideoEntity)
export class PostVideoQueryRepository extends Repository<PostVideoEntity> {
  async findPostVideoByPostId(postId: number): Promise<PostVideoEntity> {
    const row = await this.createQueryBuilder('video')
      .select(['video.id', 'video.youtubeVideoUrl', 'video.youtubeVideoId', 'video.remark'])
      .leftJoin('video.post', 'post')
      .where('post.id = :postId', { postId })
      .getOne();

    return row;
  }
}
