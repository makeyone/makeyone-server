import { Injectable } from '@nestjs/common';

import { EditPostSwitchData } from '@src/core/core-domain/domain/post/data/EditPostSwitchData';

import { PostSwitchRepository } from '@src/database/entity/Post/PostSwitch.repository';

@Injectable()
export class PostSwitchEditor {
  constructor(private readonly postSwitchRepository: PostSwitchRepository) {}

  async editPostSwitch(switchItem: EditPostSwitchData): Promise<void> {
    await this.postSwitchRepository.editPostSwitch(switchItem);
  }
}
