import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { PostPlateRepository } from '@src/database/entity/Post/PostPlate.repository';

import { FindPostPlateResult } from '@src/core-domain/post/result/FindPostPlateResult';

@Injectable()
export class PostPlateReader {
  constructor(private readonly postPlateRepository: PostPlateRepository) {}

  async findPostPlate(postId: number): Promise<FindPostPlateResult> {
    const plate = await this.postPlateRepository.findPlate(postId);

    return plainToInstance(FindPostPlateResult, plate);
  }
}
