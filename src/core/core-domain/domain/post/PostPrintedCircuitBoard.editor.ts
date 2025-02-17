import { Injectable } from '@nestjs/common';

import { EditPostPrintedCircuitBoardData } from '@src/core/core-domain/domain/post/data/EditPostPrintedCircuitBoardData';

import { PostPrintedCircuitBoardRepository } from '@src/database/entity/Post/PostPrintedCircuitBoard.repository';

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
