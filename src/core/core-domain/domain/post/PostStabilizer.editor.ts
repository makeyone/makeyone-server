import { Injectable } from '@nestjs/common';

import { EditPostStabilizerData } from '@src/core/core-domain/domain/post/data/EditPostStabilizerData';

import { PostStabilizerRepository } from '@src/database/entity/Post/PostStabilizer.repository';

@Injectable()
export class PostStabilizerEditor {
  constructor(private readonly postStabilizerRepository: PostStabilizerRepository) {}

  async editPostStabilizer(stabilizerItem: EditPostStabilizerData): Promise<void> {
    await this.postStabilizerRepository.editPostStabilizer(stabilizerItem);
  }
}
