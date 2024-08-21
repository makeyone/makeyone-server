import { Injectable } from '@nestjs/common';

import { PostPlateRepository } from '@src/database/entity/Post/PostPlate.repository';

@Injectable()
export class PostPlateRemover {
  constructor(private readonly postPlateRepository: PostPlateRepository) {}

  async deletePostPlate(targetPostId: number): Promise<void> {
    await this.postPlateRepository.deletePostPlate(targetPostId);
  }
}
