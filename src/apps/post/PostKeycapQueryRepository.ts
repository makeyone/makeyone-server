import { Repository } from 'typeorm';

import { CustomRepository } from '@src/libs/entity/decorators/TypeOrmCustomRepository.decorator';
import { PostKeycapEntity } from '@src/libs/entity/domain/post/PostKeycap.entity';

@CustomRepository(PostKeycapEntity)
export class PostKeycapQueryRepository extends Repository<PostKeycapEntity> {
  async findPostKeycapsByPostId(postId: number): Promise<PostKeycapEntity[]> {
    const rows = await this.createQueryBuilder('keycap')
      .select([
        'keycap.id',
        'keycap.keycapName',
        'keycap.keycapProfile',
        'keycap.keycapTexture',
        'keycap.manufacturer',
        'keycap.remark',
      ])
      .leftJoin('keycap.post', 'post')
      .where('post.id = :postId', { postId })
      .getMany();
    return rows;
  }
}
