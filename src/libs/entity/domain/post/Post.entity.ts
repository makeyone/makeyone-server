import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';

import { IncludeSoftDeleteCoreEntity } from '@src/libs/entity/domain/common/Core.entity';
import { PostHousingEntity } from '@src/libs/entity/domain/post/PostHousing.entity';
import { PostImageEntity } from '@src/libs/entity/domain/post/PostImage.entity';
import { PostKeycapEntity } from '@src/libs/entity/domain/post/PostKeycap.entity';
import { PostSwitchEntity } from '@src/libs/entity/domain/post/PostSwitch.entity';
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
}
