import { Injectable } from '@nestjs/common';

import { PostRepository } from '@src/database/entity/Post/Post.repository';

@Injectable()
export class PostRemover {
  constructor(private readonly postRepository: PostRepository) {}

  async deletePost(targetPostId: number): Promise<void> {
    await this.postRepository.deletePost(targetPostId);
  }
}
