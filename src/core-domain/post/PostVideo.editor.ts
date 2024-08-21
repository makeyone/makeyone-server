import { Injectable } from '@nestjs/common';

import { PostVideoRepository } from '@src/database/entity/Post/PostVideo.repository';

import { EditPostVideoData } from '@src/core-domain/post/data/EditPostVideoData';

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
