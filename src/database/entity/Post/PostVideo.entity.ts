import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';

import { BaseEntity } from '@src/database/entity/Base.entity';
import { PostEntity } from '@src/database/entity/Post/Post.entity';

@Entity({ name: 'post_video' })
@Index('idx_post', ['post'])
export class PostVideoEntity extends BaseEntity {
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

  @OneToOne(() => PostEntity, {
    createForeignKeyConstraints: false,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
  post: PostEntity;
}
