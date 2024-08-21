import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { PostKeycapRepository } from '@src/database/entity/Post/PostKeycap.repository';

import { CoreErrorType } from '@src/core-api/support/error/CoreErrorType';

import { FindPostKeycapResult } from '@src/core-domain/post/result/FindPostKeycapResult';

@Injectable()
export class PostKeycapReader {
  constructor(private readonly postKeycapRepository: PostKeycapRepository) {}

  async findPostKeycapList(postId: number): Promise<FindPostKeycapResult[]> {
    const keycapList = await this.postKeycapRepository.findKeycapList(postId);

    return plainToInstance(FindPostKeycapResult, keycapList);
  }

  async findPostKeycap(keycapId: number): Promise<FindPostKeycapResult> {
    const postKeycap = await this.postKeycapRepository.findKeycap(keycapId);
    if (!postKeycap) {
      throw new NotFoundException(CoreErrorType.KEYCAP_NOT_FOUND);
    }

    return plainToInstance(FindPostKeycapResult, postKeycap);
  }
}
