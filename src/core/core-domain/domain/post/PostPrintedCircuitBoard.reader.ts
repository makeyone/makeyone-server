import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { FindPostPrintedCircuitBoardResult } from '@src/core/core-domain/domain/post/result/FindPostPrintedCircuitBoardResult';

import { PostPrintedCircuitBoardRepository } from '@src/database/entity/Post/PostPrintedCircuitBoard.repository';

@Injectable()
export class PostPrintedCircuitBoardReader {
  constructor(private readonly postPrintedCircuitBoardRepository: PostPrintedCircuitBoardRepository) {}

  async findPrintedCircuitBoard(postId: number): Promise<FindPostPrintedCircuitBoardResult> {
    const pcb = await this.postPrintedCircuitBoardRepository.findPrintedCircuitBoard(postId);

    return plainToInstance(FindPostPrintedCircuitBoardResult, pcb);
  }
}
