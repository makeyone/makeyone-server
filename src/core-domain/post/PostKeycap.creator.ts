import { Injectable } from '@nestjs/common';

import { PostKeycapRepository } from '@src/database/entity/Post/PostKeycap.repository';

import { CreatePostKeycapData } from '@src/core-domain/post/data/CreatePostKeycapData';

@Injectable()
export class PostKeycapCreator {
  constructor(private readonly postKeycapRepository: PostKeycapRepository) {}

  async createPostKeycap(targetPostId: number, keycapItem: CreatePostKeycapData): Promise<void> {
    await this.postKeycapRepository.createPostKeycap(targetPostId, keycapItem);
  }
}
