import { Repository } from 'typeorm';

import { CustomRepository } from '@src/libs/entity/decorators/TypeOrmCustomRepository.decorator';
import { PostPCBEntity } from '@src/libs/entity/domain/post/PostPCB.entity';

@CustomRepository(PostPCBEntity)
export class PostPCBQueryRepository extends Repository<PostPCBEntity> {
  async findPostPCBByPostId(postId: number): Promise<PostPCBEntity> {
    const row = await this.createQueryBuilder('pcb')
      .select(['pcb.id', 'pcb.pcbName', 'pcb.pcbThickness', 'pcb.pcbType', 'pcb.isRgbPcb', 'pcb.isFlexCutPcb', 'pcb.remark'])
      .leftJoin('pcb.post', 'post')
      .where('post.id = :postId', { postId })
      .getOne();

    return row;
  }
}
