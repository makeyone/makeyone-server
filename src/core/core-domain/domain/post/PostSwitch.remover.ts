import { Injectable } from '@nestjs/common';

import { PostSwitchRepository } from '@src/database/entity/Post/PostSwitch.repository';

@Injectable()
export class PostSwitchRemover {
  constructor(private readonly postSwitchRepository: PostSwitchRepository) {}

  async removePostSwitch(switchId: number): Promise<void> {
    await this.postSwitchRepository.removePostSwitch(switchId);
  }
}
