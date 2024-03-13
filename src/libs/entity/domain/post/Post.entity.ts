import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';

import { IncludeSoftDeleteCoreEntity } from '@src/libs/entity/domain/common/Core.entity';
import { PostFoamEntity } from '@src/libs/entity/domain/post/PostFoam.entity';
import { PostHousingEntity } from '@src/libs/entity/domain/post/PostHousing.entity';
import { PostImageEntity } from '@src/libs/entity/domain/post/PostImage.entity';
import { PostKeyboardDefinitionEntity } from '@src/libs/entity/domain/post/PostKeyboardDefinition.entity';
import { PostKeycapEntity } from '@src/libs/entity/domain/post/PostKeycap.entity';
import { PostPCBEntity } from '@src/libs/entity/domain/post/PostPCB.entity';
import { PostPlateEntity } from '@src/libs/entity/domain/post/PostPlate.entity';
import { PostStabilizerEntity } from '@src/libs/entity/domain/post/PostStabilizer.entity';
import { PostSwitchEntity } from '@src/libs/entity/domain/post/PostSwitch.entity';
import { PostVideoEntity } from '@src/libs/entity/domain/post/PostVideo.entity';
import { UserEntity } from '@src/libs/entity/domain/user/User.entity';

@Entity({ name: 'post' })
export class PostEntity extends IncludeSoftDeleteCoreEntity {
  @Column({ type: 'varchar', length: 200, nullable: true })
  postTitle: string | null;

  @ManyToOne(() => UserEntity, (user) => user.posts, {
    onDelete: 'NO ACTION',
  })
  postedUser: UserEntity;

  @OneToMany(() => PostImageEntity, (postImages) => postImages.post)
  postImages: PostImageEntity[];

  @OneToOne(() => PostHousingEntity, (postHousing) => postHousing.post)
  postHousing: PostHousingEntity;

  @OneToMany(() => PostSwitchEntity, (postSwitches) => postSwitches.post)
  postSwitches: PostSwitchEntity[];

  @OneToMany(() => PostKeycapEntity, (postKeycaps) => postKeycaps.post)
  postKeycaps: PostKeycapEntity[];

  @OneToMany(() => PostStabilizerEntity, (postStabilizers) => postStabilizers.post)
  postStabilizers: PostStabilizerEntity[];

  @OneToOne(() => PostKeyboardDefinitionEntity, (postKeyboardDefinition) => postKeyboardDefinition.post)
  postKeyboardDefinition: PostKeyboardDefinitionEntity;

  @OneToOne(() => PostPCBEntity, (postPCB) => postPCB.post)
  postPCB: PostPCBEntity;

  @OneToOne(() => PostPlateEntity, (postPlate) => postPlate.post)
  postPlate: PostPlateEntity;

  @OneToOne(() => PostFoamEntity, (postFoam) => postFoam.post)
  postFoam: PostFoamEntity;

  @OneToOne(() => PostVideoEntity, (postVideo) => postVideo.post)
  postVideo: PostVideoEntity;
}
