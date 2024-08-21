import { Injectable } from '@nestjs/common';

import { PostVideoRepository } from '@src/database/entity/Post/PostVideo.repository';

@Injectable()
export class PostVideoRemover {
  constructor(private readonly postVideoRepository: PostVideoRepository) {}

  async deletePostVideo(targetPostId: number): Promise<void> {
    await this.postVideoRepository.deletePostVideo(targetPostId);
  }
}
