import { Injectable } from '@nestjs/common';

import { PostPlateRepository } from '@src/database/entity/Post/PostPlate.repository';

import { EditPostPlateData } from '@src/core-domain/post/data/EditPostPlateData';

@Injectable()
export class PostPlateEditor {
  constructor(private readonly postPlateRepository: PostPlateRepository) {}

  async editPostPlate(targetPostId: number, editPostPlateData: EditPostPlateData): Promise<void> {
    await this.postPlateRepository.editPostPlate(targetPostId, editPostPlateData);
  }
}
