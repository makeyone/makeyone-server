import { Injectable } from '@nestjs/common';

import { PostRepository } from '@src/database/entity/Post/Post.repository';

@Injectable()
export class PostEditor {
  constructor(private readonly postRepository: PostRepository) {}

  async editPostTitle(targetPostId: number, postTitle: string): Promise<void> {
    await this.postRepository.editPostTitle(targetPostId, postTitle);
  }

  async editPostContent(targetPostId: number, postContent: string): Promise<void> {
    await this.postRepository.editPostContent(targetPostId, postContent);
  }

  async editPostSetting(targetPostId: number, isPublished: boolean): Promise<void> {
    await this.postRepository.editPostSetting(targetPostId, isPublished);
  }
}
