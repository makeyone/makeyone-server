import { Injectable } from '@nestjs/common';

import { PostHousingRepository } from '@src/database/entity/Post/PostHousing.repository';

import { EditPostHousingData } from '@src/core-domain/post/data/EditPostHousingData';

@Injectable()
export class PostHousingEditor {
  constructor(private readonly postHousingRepository: PostHousingRepository) {}

  async editPostHousing(targetPostId: number, editPostHousingData: EditPostHousingData): Promise<void> {
    await this.postHousingRepository.editPostHousing(targetPostId, editPostHousingData);
  }
}
