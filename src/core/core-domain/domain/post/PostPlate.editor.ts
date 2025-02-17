import { Injectable } from '@nestjs/common';

import { EditPostPlateData } from '@src/core/core-domain/domain/post/data/EditPostPlateData';

import { PostPlateRepository } from '@src/database/entity/Post/PostPlate.repository';

@Injectable()
export class PostPlateEditor {
  constructor(private readonly postPlateRepository: PostPlateRepository) {}

  async editPostPlate(targetPostId: number, editPostPlateData: EditPostPlateData): Promise<void> {
    await this.postPlateRepository.editPostPlate(targetPostId, editPostPlateData);
  }
}
