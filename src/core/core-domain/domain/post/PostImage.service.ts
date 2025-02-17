import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { EditPostImageData } from '@src/core/core-domain/domain/post/data/EditPostImageData';
import { PostImageEditor } from '@src/core/core-domain/domain/post/PostImage.editor';
import { PostImageReader } from '@src/core/core-domain/domain/post/PostImage.reader';
import { FindPostImageResult } from '@src/core/core-domain/domain/post/result/FindPostImageResult';

@Injectable()
export class PostImageService {
  constructor(private readonly postImageReader: PostImageReader, private readonly postImageEditor: PostImageEditor) {}

  async findPostImageList(postId: number): Promise<FindPostImageResult[]> {
    const images = await this.postImageReader.findPostImageList(postId);

    return images;
  }

  @Transactional()
  async editPostImageList(targetPostId: number, imageList: EditPostImageData[]): Promise<number> {
    await this.postImageEditor.editPostImageList(targetPostId, imageList);
    return targetPostId;
  }
}
