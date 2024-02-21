import { Repository } from 'typeorm';

import { CustomRepository } from '@src/libs/entity/decorators/TypeOrmCustomRepository.decorator';
import { PostStabilizerEntity } from '@src/libs/entity/domain/post/PostStabilizer.entity';

@CustomRepository(PostStabilizerEntity)
export class PostStabilizerQueryRepository extends Repository<PostStabilizerEntity> {
  async findPostStabilizersByPostId(postId: number): Promise<PostStabilizerEntity[]> {
    const rows = await this.createQueryBuilder('stabilizer')
      .select([
        'stabilizer.id',
        'stabilizer.stabilizerName',
        'stabilizer.stabilizerType',
        'stabilizer.stabilizerMount',
        'stabilizer.remark',
      ])
      .leftJoin('stabilizer.post', 'post')
      .where('post.id = :postId', { postId })
      .getMany();
    return rows;
  }
}
