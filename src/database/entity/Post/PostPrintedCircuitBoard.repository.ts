import { Repository } from 'typeorm';

import { EditPostPrintedCircuitBoardData } from '@src/core/core-domain/domain/post/data/EditPostPrintedCircuitBoardData';

import { CustomRepository } from '@src/database/decorator/TypeOrmCustomRepository.decorator';
import { PostPrintedCircuitBoardEntity } from '@src/database/entity/Post/PostPrintedCircuitBoard.entity';

@CustomRepository(PostPrintedCircuitBoardEntity)
export class PostPrintedCircuitBoardRepository extends Repository<PostPrintedCircuitBoardEntity> {
  async findPrintedCircuitBoard(postId: number): Promise<PostPrintedCircuitBoardEntity> {
    const row = await this.createQueryBuilder('pcb')
      .select([
        'pcb.id',
        'pcb.pcbName',
        'pcb.pcbThickness',
        'pcb.pcbType',
        'pcb.isRgbPcb',
        'pcb.isFlexCutPcb',
        'pcb.remark',
      ])
      .leftJoin('pcb.post', 'post')
      .where('post.id = :postId', { postId })
      .getOne();

    return row;
  }

  async editPostPrintedCircuitBoard(
    targetPostId: number,
    { pcbName, pcbType, isRgbPcb, isFlexCutPcb, pcbThickness, remark }: EditPostPrintedCircuitBoardData,
  ): Promise<void> {
    const printedCircuitBoard = await this.findPrintedCircuitBoard(targetPostId);

    if (printedCircuitBoard) {
      await this.update(
        { post: { id: targetPostId } },
        {
          pcbName,
          pcbType,
          isRgbPcb,
          isFlexCutPcb,
          pcbThickness: pcbThickness || null,
          remark: remark || '',
        },
      );
    }

    if (!printedCircuitBoard) {
      await this.save(
        this.create({
          pcbName,
          pcbType,
          isRgbPcb,
          isFlexCutPcb,
          pcbThickness: pcbThickness || null,
          remark: remark || '',
          post: { id: targetPostId },
        }),
      );
    }
  }
}
