import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { FindPostVideoResult } from '@src/core/core-domain/domain/post/result/FindPostVideoResult';

import { PostVideoRepository } from '@src/database/entity/Post/PostVideo.repository';

@Injectable()
export class PostVideoReader {
  constructor(private readonly postVideoRepository: PostVideoRepository) {}

  async findPostVideo(postId: number): Promise<FindPostVideoResult> {
    const video = await this.postVideoRepository.findVideo(postId);

    return plainToInstance(FindPostVideoResult, video);
  }
}
