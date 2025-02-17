import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { FindPostPlateResult } from '@src/core/core-domain/domain/post/result/FindPostPlateResult';

import { PostPlateRepository } from '@src/database/entity/Post/PostPlate.repository';

@Injectable()
export class PostPlateReader {
  constructor(private readonly postPlateRepository: PostPlateRepository) {}

  async findPostPlate(postId: number): Promise<FindPostPlateResult> {
    const plate = await this.postPlateRepository.findPlate(postId);

    return plainToInstance(FindPostPlateResult, plate);
  }
}
