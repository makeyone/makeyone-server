import { Repository } from 'typeorm';

import { CustomRepository } from '@src/libs/entity/decorators/TypeOrmCustomRepository.decorator';
import { PostPlateEntity } from '@src/libs/entity/domain/post/PostPlate.entity';

@CustomRepository(PostPlateEntity)
export class PostPlateQueryRepository extends Repository<PostPlateEntity> {
  async findPostPlateByPostId(postId: number): Promise<PostPlateEntity> {
    const row = await this.createQueryBuilder('plate')
      .select(['plate.id', 'plate.plateName', 'plate.plateTexture', 'plate.isFlexCutPlate', 'plate.isHalfPlate', 'plate.remark'])
      .leftJoin('plate.post', 'post')
      .where('post.id = :postId', { postId })
      .getOne();

    return row;
  }
}
