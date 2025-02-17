import { Injectable } from '@nestjs/common';

import { EditPostFoamData } from '@src/core/core-domain/domain/post/data/EditPostFoamData';

import { PostFoamRepository } from '@src/database/entity/Post/PostFoam.repository';

@Injectable()
export class PostFoamEditor {
  constructor(private readonly postFoamRepository: PostFoamRepository) {}

  async editPostFoam(targetPostId: number, editPostFoamData: EditPostFoamData): Promise<void> {
    await this.postFoamRepository.editPostFoam(targetPostId, editPostFoamData);
  }
}
