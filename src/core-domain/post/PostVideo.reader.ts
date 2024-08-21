import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { PostVideoRepository } from '@src/database/entity/Post/PostVideo.repository';

import { FindPostVideoResult } from '@src/core-domain/post/result/FindPostVideoResult';

@Injectable()
export class PostVideoReader {
  constructor(private readonly postVideoRepository: PostVideoRepository) {}

  async findPostVideo(postId: number): Promise<FindPostVideoResult> {
    const video = await this.postVideoRepository.findVideo(postId);

    return plainToInstance(FindPostVideoResult, video);
  }
}
