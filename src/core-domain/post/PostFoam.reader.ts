import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { PostFoamRepository } from '@src/database/entity/Post/PostFoam.repository';

import { FindPostFoamResult } from '@src/core-domain/post/result/FindPostFoamResult';

@Injectable()
export class PostFoamReader {
  constructor(private readonly postFoamRepository: PostFoamRepository) {}

  async findPostFoam(postId: number): Promise<FindPostFoamResult> {
    const foam = await this.postFoamRepository.findFoam(postId);

    return plainToInstance(FindPostFoamResult, foam);
  }
}
