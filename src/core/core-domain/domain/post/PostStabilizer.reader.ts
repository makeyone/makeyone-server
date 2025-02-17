import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { FindPostStabilizerResult } from '@src/core/core-domain/domain/post/result/FindPostStabilizerResult';

import { PostStabilizerRepository } from '@src/database/entity/Post/PostStabilizer.repository';

@Injectable()
export class PostStabilizerReader {
  constructor(private readonly postStabilizerRepository: PostStabilizerRepository) {}

  async findPostStabilizerList(postId: number): Promise<FindPostStabilizerResult[]> {
    const stabilizerList = await this.postStabilizerRepository.findStabilizerList(postId);

    return plainToInstance(FindPostStabilizerResult, stabilizerList);
  }
}
