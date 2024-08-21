import { Injectable } from '@nestjs/common';

import { PostStabilizerRepository } from '@src/database/entity/Post/PostStabilizer.repository';

import { EditPostStabilizerData } from '@src/core-domain/post/data/EditPostStabilizerData';

@Injectable()
export class PostStabilizerEditor {
  constructor(private readonly postStabilizerRepository: PostStabilizerRepository) {}

  async editPostStabilizer(stabilizerItem: EditPostStabilizerData): Promise<void> {
    await this.postStabilizerRepository.editPostStabilizer(stabilizerItem);
  }
}
