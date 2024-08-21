import { Injectable } from '@nestjs/common';

import { PostFoamRepository } from '@src/database/entity/Post/PostFoam.repository';

import { EditPostFoamData } from '@src/core-domain/post/data/EditPostFoamData';

@Injectable()
export class PostFoamEditor {
  constructor(private readonly postFoamRepository: PostFoamRepository) {}

  async editPostFoam(targetPostId: number, editPostFoamData: EditPostFoamData): Promise<void> {
    await this.postFoamRepository.editPostFoam(targetPostId, editPostFoamData);
  }
}
