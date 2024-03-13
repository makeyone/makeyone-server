import { Column, Entity, ManyToOne } from 'typeorm';

import { CoreEntity } from '@src/libs/entity/domain/common/Core.entity';
import { PostEntity } from '@src/libs/entity/domain/post/Post.entity';

@Entity({ name: 'post_video' })
export class PostVideoEntity extends CoreEntity {
  @Column({
    type: 'varchar',
    length: 3000,
  })
  youtubeVideoUrl: string;

  @Column({
    type: 'varchar',
    length: 300,
  })
  youtubeVideoId: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: true,
    comment: '특이사항',
  })
  remark: string | null;

  @ManyToOne(() => PostEntity, (post) => post.postVideo, {
    onDelete: 'CASCADE',
  })
  post: PostEntity;
}
