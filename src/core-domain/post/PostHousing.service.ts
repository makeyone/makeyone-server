import { Injectable } from '@nestjs/common';

import { EditPostHousingData } from '@src/core-domain/post/data/EditPostHousingData';
import { PostHousingReader } from '@src/core-domain/post/PostHousing.reader';
import { PostHousingEditor } from '@src/core-domain/post/PostIHousing.editor';
import { FindPostHousingResult } from '@src/core-domain/post/result/FindPostHousingResult';

@Injectable()
export class PostHousingService {
  constructor(
    private readonly postHousingReader: PostHousingReader,
    private readonly postHousingEditor: PostHousingEditor,
  ) {}

  async findPostHousing(postId: number): Promise<FindPostHousingResult> {
    const housing = await this.postHousingReader.findPostHousing(postId);

    return housing;
  }

  async editPostHousing(targetPostId: number, editPostHousingData: EditPostHousingData): Promise<number> {
    await this.postHousingEditor.editPostHousing(targetPostId, editPostHousingData);
    return targetPostId;
  }
}
