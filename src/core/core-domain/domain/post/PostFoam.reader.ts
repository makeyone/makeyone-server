import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { FindPostFoamResult } from '@src/core/core-domain/domain/post/result/FindPostFoamResult';

import { PostFoamRepository } from '@src/database/entity/Post/PostFoam.repository';

@Injectable()
export class PostFoamReader {
  constructor(private readonly postFoamRepository: PostFoamRepository) {}

  async findPostFoam(postId: number): Promise<FindPostFoamResult> {
    const foam = await this.postFoamRepository.findFoam(postId);

    return plainToInstance(FindPostFoamResult, foam);
  }
}
