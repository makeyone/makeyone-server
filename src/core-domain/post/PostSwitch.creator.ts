import { Injectable } from '@nestjs/common';

import { PostSwitchRepository } from '@src/database/entity/Post/PostSwitch.repository';

import { CreatePostSwitchData } from '@src/core-domain/post/data/CreatePostSwitchData';

@Injectable()
export class PostSwitchCreator {
  constructor(private readonly postSwitchRepository: PostSwitchRepository) {}

  async createPostSwitch(targetPostId: number, switchItem: CreatePostSwitchData): Promise<void> {
    await this.postSwitchRepository.createPostSwitch(targetPostId, switchItem);
  }
}
