import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { PostImageRepository } from '@src/database/entity/Post/PostImage.repository';

import { FindPostImageResult } from '@src/core-domain/post/result/FindPostImageResult';

@Injectable()
export class PostImageReader {
  constructor(private readonly postImageRepository: PostImageRepository) {}

  async findPostImageList(postId: number): Promise<FindPostImageResult[]> {
    const imageList = await this.postImageRepository.findImageList(postId);

    return plainToInstance(FindPostImageResult, imageList);
  }
}
