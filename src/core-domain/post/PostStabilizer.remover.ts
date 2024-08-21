import { Injectable } from '@nestjs/common';

import { PostStabilizerRepository } from '@src/database/entity/Post/PostStabilizer.repository';

@Injectable()
export class PostStabilizerRemover {
  constructor(private readonly postStabilizerRepository: PostStabilizerRepository) {}

  async removePostStabilizer(stabilizerId: number): Promise<void> {
    await this.postStabilizerRepository.removePostStabilizer(stabilizerId);
  }
}
