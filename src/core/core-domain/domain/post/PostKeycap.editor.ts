import { Injectable } from '@nestjs/common';

import { EditPostKeycapData } from '@src/core/core-domain/domain/post/data/EditPostKeycapData';

import { PostKeycapRepository } from '@src/database/entity/Post/PostKeycap.repository';

@Injectable()
export class PostKeycapEditor {
  constructor(private readonly postKeycapRepository: PostKeycapRepository) {}

  async editPostKeycap(keycapItem: EditPostKeycapData): Promise<void> {
    await this.postKeycapRepository.editPostKeycap(keycapItem);
  }
}
