import { Injectable } from '@nestjs/common';

import { CreatePostStabilizerData } from '@src/core/core-domain/domain/post/data/CreatePostStabilizerData';

import { PostStabilizerRepository } from '@src/database/entity/Post/PostStabilizer.repository';

@Injectable()
export class PostStabilizerCreator {
  constructor(private readonly postStabilizerRepository: PostStabilizerRepository) {}

  async createPostStabilizer(targetPostId: number, stabilizerItem: CreatePostStabilizerData): Promise<void> {
    await this.postStabilizerRepository.createPostStabilizer(targetPostId, stabilizerItem);
  }
}
