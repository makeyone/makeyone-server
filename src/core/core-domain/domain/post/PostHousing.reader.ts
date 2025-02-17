import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { FindPostHousingResult } from '@src/core/core-domain/domain/post/result/FindPostHousingResult';

import { PostHousingRepository } from '@src/database/entity/Post/PostHousing.repository';

@Injectable()
export class PostHousingReader {
  constructor(private readonly postHousingRepository: PostHousingRepository) {}

  async findPostHousing(postId: number): Promise<FindPostHousingResult> {
    const housing = await this.postHousingRepository.findHousing(postId);

    return plainToInstance(FindPostHousingResult, housing);
  }
}
