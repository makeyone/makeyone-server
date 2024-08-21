import { Injectable } from '@nestjs/common';

import { PostStabilizerRepository } from '@src/database/entity/Post/PostStabilizer.repository';

import { CreatePostStabilizerData } from '@src/core-domain/post/data/CreatePostStabilizerData';

@Injectable()
export class PostStabilizerCreator {
  constructor(private readonly postStabilizerRepository: PostStabilizerRepository) {}

  async createPostStabilizer(targetPostId: number, stabilizerItem: CreatePostStabilizerData): Promise<void> {
    await this.postStabilizerRepository.createPostStabilizer(targetPostId, stabilizerItem);
  }
}
