import { Injectable } from '@nestjs/common';

import { PostSwitchRepository } from '@src/database/entity/Post/PostSwitch.repository';

import { EditPostSwitchData } from '@src/core-domain/post/data/EditPostSwitchData';

@Injectable()
export class PostSwitchEditor {
  constructor(private readonly postSwitchRepository: PostSwitchRepository) {}

  async editPostSwitch(switchItem: EditPostSwitchData): Promise<void> {
    await this.postSwitchRepository.editPostSwitch(switchItem);
  }
}
