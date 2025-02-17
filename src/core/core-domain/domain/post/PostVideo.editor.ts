import { Injectable } from '@nestjs/common';

import { EditPostVideoData } from '@src/core/core-domain/domain/post/data/EditPostVideoData';

import { PostVideoRepository } from '@src/database/entity/Post/PostVideo.repository';

@Injectable()
export class PostVideoEditor {
  constructor(private readonly postVideoRepository: PostVideoRepository) {}

  async editPostVideo(
    targetPostId: number,
    youtubeVideoId: string,
    editPostVideoData: EditPostVideoData,
  ): Promise<void> {
    await this.postVideoRepository.editPostVideo(targetPostId, youtubeVideoId, editPostVideoData);
  }
}
