import { Injectable } from '@nestjs/common';

import { EditPostHousingData } from '@src/core/core-domain/domain/post/data/EditPostHousingData';

import { PostHousingRepository } from '@src/database/entity/Post/PostHousing.repository';

@Injectable()
export class PostHousingEditor {
  constructor(private readonly postHousingRepository: PostHousingRepository) {}

  async editPostHousing(targetPostId: number, editPostHousingData: EditPostHousingData): Promise<void> {
    await this.postHousingRepository.editPostHousing(targetPostId, editPostHousingData);
  }
}
