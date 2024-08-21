import { Injectable } from '@nestjs/common';

import { PostKeycapRepository } from '@src/database/entity/Post/PostKeycap.repository';

import { EditPostKeycapData } from '@src/core-domain/post/data/EditPostKeycapData';

@Injectable()
export class PostKeycapEditor {
  constructor(private readonly postKeycapRepository: PostKeycapRepository) {}

  async editPostKeycap(keycapItem: EditPostKeycapData): Promise<void> {
    await this.postKeycapRepository.editPostKeycap(keycapItem);
  }
}
