import { Injectable } from '@nestjs/common';

import { CreatePostSwitchData } from '@src/core/core-domain/domain/post/data/CreatePostSwitchData';

import { PostSwitchRepository } from '@src/database/entity/Post/PostSwitch.repository';

@Injectable()
export class PostSwitchCreator {
  constructor(private readonly postSwitchRepository: PostSwitchRepository) {}

  async createPostSwitch(targetPostId: number, switchItem: CreatePostSwitchData): Promise<void> {
    await this.postSwitchRepository.createPostSwitch(targetPostId, switchItem);
  }
}
