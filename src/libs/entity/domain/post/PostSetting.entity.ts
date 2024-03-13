import { Column, Entity, ManyToOne } from 'typeorm';

import { CoreEntity } from '@src/libs/entity/domain/common/Core.entity';
import { PostEntity } from '@src/libs/entity/domain/post/Post.entity';

@Entity({ name: 'post_setting' })
export class PostSettingEntity extends CoreEntity {
  @Column({
    type: 'boolean',
  })
  isPublished: boolean;

  @ManyToOne(() => PostEntity, (post) => post.postSetting, {
    onDelete: 'CASCADE',
  })
  post: PostEntity;
}
