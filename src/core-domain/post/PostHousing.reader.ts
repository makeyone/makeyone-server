import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { PostHousingRepository } from '@src/database/entity/Post/PostHousing.repository';

import { FindPostHousingResult } from '@src/core-domain/post/result/FindPostHousingResult';

@Injectable()
export class PostHousingReader {
  constructor(private readonly postHousingRepository: PostHousingRepository) {}

  async findPostHousing(postId: number): Promise<FindPostHousingResult> {
    const housing = await this.postHousingRepository.findHousing(postId);

    return plainToInstance(FindPostHousingResult, housing);
  }
}
