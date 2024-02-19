import { Column, Entity, ManyToOne } from 'typeorm';

import { CoreEntity } from '@src/libs/entity/domain/common/Core.entity';
import { PostEntity } from '@src/libs/entity/domain/post/Post.entity';

@Entity({ name: 'post_image' })
export class PostImageEntity extends CoreEntity {
  @Column({ type: 'varchar', length: 500 })
  imageUrl: string;

  @ManyToOne(() => PostEntity, (post) => post.postImages, {
    onDelete: 'CASCADE',
  })
  post: PostEntity;
}
