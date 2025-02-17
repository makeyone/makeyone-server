import { Injectable } from '@nestjs/common';

import { EditPostPrintedCircuitBoardData } from '@src/core/core-domain/domain/post/data/EditPostPrintedCircuitBoardData';
import { PostPrintedCircuitBoardEditor } from '@src/core/core-domain/domain/post/PostPrintedCircuitBoard.editor';
import { PostPrintedCircuitBoardReader } from '@src/core/core-domain/domain/post/PostPrintedCircuitBoard.reader';
import { FindPostPrintedCircuitBoardResult } from '@src/core/core-domain/domain/post/result/FindPostPrintedCircuitBoardResult';

@Injectable()
export class PostPrintedCircuitBoardService {
  constructor(
    private readonly postPrintedCircuitBoardReader: PostPrintedCircuitBoardReader,
    private readonly postPrintedCircuitBoardEditor: PostPrintedCircuitBoardEditor,
  ) {}

  async findPostPrintedCircuitBoard(postId: number): Promise<FindPostPrintedCircuitBoardResult> {
    const PrintedCircuitBoard = await this.postPrintedCircuitBoardReader.findPrintedCircuitBoard(postId);

    return PrintedCircuitBoard;
  }

  async editPostPrintedCircuitBoard(
    targetPostId: number,
    editPostPrintedCircuitBoardData: EditPostPrintedCircuitBoardData,
  ): Promise<number> {
    await this.postPrintedCircuitBoardEditor.editPostPrintedCircuitBoard(targetPostId, editPostPrintedCircuitBoardData);
    return targetPostId;
  }
}
