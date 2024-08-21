import { Repository } from 'typeorm';

import { CustomRepository } from '@src/database/decorator/TypeOrmCustomRepository.decorator';
import { PostVideoEntity } from '@src/database/entity/Post/PostVideo.entity';

import { EditPostVideoData } from '@src/core-domain/post/data/EditPostVideoData';

@CustomRepository(PostVideoEntity)
export class PostVideoRepository extends Repository<PostVideoEntity> {
  async findVideo(postId: number): Promise<PostVideoEntity> {
    const row = await this.createQueryBuilder('video')
      .select(['video.id', 'video.youtubeVideoUrl', 'video.youtubeVideoId', 'video.remark'])
      .leftJoin('video.post', 'post')
      .where('post.id = :postId', { postId })
      .getOne();

    return row;
  }

  async editPostVideo(
    targetPostId: number,
    youtubeVideoId: string,
    { youtubeVideoUrl, remark }: EditPostVideoData,
  ): Promise<void> {
    const video = await this.findVideo(targetPostId);

    if (video) {
      await this.update(
        { post: { id: targetPostId } },
        {
          youtubeVideoUrl,
          youtubeVideoId: youtubeVideoId,
          remark: remark || null,
        },
      );
    }

    if (!video) {
      await this.save(
        this.create({
          youtubeVideoUrl,
          youtubeVideoId: youtubeVideoId,
          remark: remark || null,
          post: { id: targetPostId },
        }),
      );
    }
  }

  async deletePostVideo(targetPostId: number): Promise<void> {
    const video = await this.findVideo(targetPostId);

    if (video) {
      await this.delete({ post: { id: targetPostId } });
    }
  }
}
