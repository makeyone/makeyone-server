import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { PostSwitchRepository } from '@src/database/entity/Post/PostSwitch.repository';

import { CoreErrorType } from '@src/core-api/support/error/CoreErrorType';

import { FindPostSwitchResult } from '@src/core-domain/post/result/FindPostSwitchResult';

@Injectable()
export class PostSwitchReader {
  constructor(private readonly postSwitchRepository: PostSwitchRepository) {}

  async findPostSwitchList(postId: number): Promise<FindPostSwitchResult[]> {
    const switchList = await this.postSwitchRepository.findSwitchList(postId);

    return plainToInstance(FindPostSwitchResult, switchList);
  }

  async findPostSwitch(switchId: number): Promise<FindPostSwitchResult> {
    const postSwitch = await this.postSwitchRepository.findSwitch(switchId);
    if (!postSwitch) {
      throw new NotFoundException(CoreErrorType.SWITCH_NOT_FOUND);
    }

    return plainToInstance(FindPostSwitchResult, postSwitch);
  }
}