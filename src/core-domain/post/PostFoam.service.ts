import { Injectable } from '@nestjs/common';

import { EditPostFoamData } from '@src/core-domain/post/data/EditPostFoamData';
import { PostFoamEditor } from '@src/core-domain/post/PostFoam.editor';
import { PostFoamReader } from '@src/core-domain/post/PostFoam.reader';
import { FindPostFoamResult } from '@src/core-domain/post/result/FindPostFoamResult';

@Injectable()
export class PostFoamService {
  constructor(private readonly postFoamReader: PostFoamReader, private readonly postFoamEditor: PostFoamEditor) {}

  async findPostFoam(postId: number): Promise<FindPostFoamResult> {
    const foam = await this.postFoamReader.findPostFoam(postId);

    return foam;
  }

  async editPostFoam(targetPostId: number, editPostFoamData: EditPostFoamData): Promise<number> {
    await this.postFoamEditor.editPostFoam(targetPostId, editPostFoamData);
    return targetPostId;
  }
}
