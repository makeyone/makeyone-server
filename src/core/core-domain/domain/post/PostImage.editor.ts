import { Injectable } from '@nestjs/common';

import { EditPostImageData } from '@src/core/core-domain/domain/post/data/EditPostImageData';

import { PostImageRepository } from '@src/database/entity/Post/PostImage.repository';

@Injectable()
export class PostImageEditor {
  constructor(private readonly postImageRepository: PostImageRepository) {}

  async editPostImageList(targetPostId: number, imageList: EditPostImageData[]): Promise<void> {
    await this.postImageRepository.editPostImageList(targetPostId, imageList);
  }
}
