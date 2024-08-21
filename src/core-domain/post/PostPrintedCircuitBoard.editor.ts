import { Injectable } from '@nestjs/common';

import { PostPrintedCircuitBoardRepository } from '@src/database/entity/Post/PostPrintedCircuitBoard.repository';

import { EditPostPrintedCircuitBoardData } from '@src/core-domain/post/data/EditPostPrintedCircuitBoardData';

@Injectable()
export class PostPrintedCircuitBoardEditor {
  constructor(private readonly postPrintedCircuitBoardRepository: PostPrintedCircuitBoardRepository) {}

  async editPostPrintedCircuitBoard(
    targetPostId: number,
    editPostPrintedCircuitBoardData: EditPostPrintedCircuitBoardData,
  ): Promise<void> {
    await this.postPrintedCircuitBoardRepository.editPostPrintedCircuitBoard(
      targetPostId,
      editPostPrintedCircuitBoardData,
    );
  }
}
