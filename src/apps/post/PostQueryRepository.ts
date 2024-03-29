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
        'post.postContent',
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
        'keyboardDefinition.id',
        'keyboardDefinition.definitionName',
        'keyboardDefinition.keyboardDefinition',
        'keyboardDefinition.layoutOptionKeys',
        'pcb.id',
        'pcb.pcbName',
        'pcb.pcbThickness',
        'pcb.pcbType',
        'pcb.isFlexCutPcb',
        'pcb.isRgbPcb',
        'pcb.remark',
        'plate.id',
        'plate.plateName',
        'plate.plateTexture',
        'plate.isHalfPlate',
        'plate.isFlexCutPlate',
        'plate.remark',
        'foam.id',
        'foam.plateBetweenPCBFoam',
        'foam.bottomSwitchPEFoam',
        'foam.bottomFoam',
        'foam.tapeMod',
        'foam.remark',
        'video.id',
        'video.youtubeVideoUrl',
        'video.youtubeVideoId',
        'video.remark',
        'setting.id',
        'setting.isPublished',
      ])
      .leftJoin('post.postedUser', 'user')
      .leftJoin('post.postImages', 'image')
      .leftJoin('post.postHousing', 'housing')
      .leftJoin('post.postSwitches', 'switch')
      .leftJoin('post.postKeycaps', 'keycap')
      .leftJoin('post.postStabilizers', 'stabilizer')
      .leftJoin('post.postKeyboardDefinition', 'keyboardDefinition')
      .leftJoin('post.postPCB', 'pcb')
      .leftJoin('post.postPlate', 'plate')
      .leftJoin('post.postFoam', 'foam')
      .leftJoin('post.postVideo', 'video')
      .leftJoin('post.postSetting', 'setting')
      .where('post.id = :postId', { postId })
      .getOne();

    return row;
  }
}
