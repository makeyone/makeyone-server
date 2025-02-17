import { Injectable } from '@nestjs/common';

import { EditPostPlateData } from '@src/core/core-domain/domain/post/data/EditPostPlateData';
import { PostPlateEditor } from '@src/core/core-domain/domain/post/PostPlate.editor';
import { PostPlateReader } from '@src/core/core-domain/domain/post/PostPlate.reader';
import { PostPlateRemover } from '@src/core/core-domain/domain/post/PostPlate.remover';
import { FindPostPlateResult } from '@src/core/core-domain/domain/post/result/FindPostPlateResult';

@Injectable()
export class PostPlateService {
  constructor(
    private readonly postPlateReader: PostPlateReader,
    private readonly postPlateEditor: PostPlateEditor,
    private readonly postPlateRemover: PostPlateRemover,
  ) {}

  async findPostPlate(postId: number): Promise<FindPostPlateResult> {
    const plate = await this.postPlateReader.findPostPlate(postId);

    return plate;
  }

  async editPostPlate(targetPostId: number, editPostPlateData: EditPostPlateData): Promise<number> {
    await this.postPlateEditor.editPostPlate(targetPostId, editPostPlateData);
    return targetPostId;
  }

  async deletePostPlate(targetPostId: number): Promise<number> {
    await this.postPlateRemover.deletePostPlate(targetPostId);
    return targetPostId;
  }
}
