import { Repository } from 'typeorm';

import { CustomRepository } from '@src/libs/entity/decorators/TypeOrmCustomRepository.decorator';
import { PostEntity } from '@src/libs/entity/domain/post/Post.entity';

import { GetPostById } from '@src/apps/post/dto/GetPostById.dto';

@CustomRepository(PostEntity)
export class PostQueryRepository extends Repository<PostEntity> {
  async findPostById(postId: number): Promise<GetPostById> {
    const row: GetPostById = await this.createQueryBuilder('post')
      .select([
        'post.id',
        'post.createdAt',
        'post.postTitle',
        'user.id',
        'user.profileImg',
        'user.nickname',
        'image.id',
        'image.imageUrl',
        'housing.id',
        'housing.housingName',
        'housing.housingColor',
        'housing.housingMount',
        'housing.housingLayout',
        'housing.housingWindowKeyLayout',
        'housing.housingFunctionKeyLayout',
        'housing.isHousingReAnodized',
        'switch.id',
        'switch.switchName',
        'switch.switchType',
        'switch.isSlientSwitch',
        'switch.switchLube',
        'switch.bottomOutForce',
        'switch.springLength',
        'switch.switchFilm',
        'switch.remark',
        'keycap.id',
        'keycap.keycapName',
        'keycap.keycapProfile',
        'keycap.keycapTexture',
        'keycap.manufacturer',
        'keycap.remark',
        'stabilizer.id',
        'stabilizer.stabilizerName',
        'stabilizer.stabilizerType',
        'stabilizer.stabilizerMount',
        'stabilizer.remark',
      ])
      .leftJoin('post.postedUser', 'user')
      .leftJoin('post.postImages', 'image')
      .leftJoin('post.postHousing', 'housing')
      .leftJoin('post.postSwitches', 'switch')
      .leftJoin('post.postKeycaps', 'keycap')
      .leftJoin('post.postStabilizers', 'stabilizer')
      .where('post.id = :postId', { postId })
      .getOne();

    return row;
  }
}
