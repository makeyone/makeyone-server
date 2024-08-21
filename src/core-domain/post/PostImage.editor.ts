import { Injectable } from '@nestjs/common';

import { PostImageRepository } from '@src/database/entity/Post/PostImage.repository';

import { EditPostImageData } from '@src/core-domain/post/data/EditPostImageData';

@Injectable()
export class PostImageEditor {
  constructor(private readonly postImageRepository: PostImageRepository) {}

  async editPostImageList(targetPostId: number, imageList: EditPostImageData[]): Promise<void> {
    await this.postImageRepository.editPostImageList(targetPostId, imageList);
  }
}
