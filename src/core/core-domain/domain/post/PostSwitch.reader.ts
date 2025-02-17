import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { FindPostSwitchResult } from '@src/core/core-domain/domain/post/result/FindPostSwitchResult';
import { CoreErrorType } from '@src/core/core-domain/support/error/CoreErrorType';

import { PostSwitchRepository } from '@src/database/entity/Post/PostSwitch.repository';

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
