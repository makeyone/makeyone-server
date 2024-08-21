import { Injectable } from '@nestjs/common';

import { PostRepository } from '@src/database/entity/Post/Post.repository';

@Injectable()
export class PostCreator {
  constructor(private readonly postRepository: PostRepository) {}

  async createPost(postUserId: number): Promise<number> {
    const createdPost = await this.postRepository.createPost(postUserId);

    return createdPost.id;
  }
}
