import { Injectable } from '@nestjs/common';

import { CreatePostKeycapData } from '@src/core/core-domain/domain/post/data/CreatePostKeycapData';

import { PostKeycapRepository } from '@src/database/entity/Post/PostKeycap.repository';

@Injectable()
export class PostKeycapCreator {
  constructor(private readonly postKeycapRepository: PostKeycapRepository) {}

  async createPostKeycap(targetPostId: number, keycapItem: CreatePostKeycapData): Promise<void> {
    await this.postKeycapRepository.createPostKeycap(targetPostId, keycapItem);
  }
}
