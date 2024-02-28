import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { CoreEntity } from '@src/libs/entity/domain/common/Core.entity';
import { PostEntity } from '@src/libs/entity/domain/post/Post.entity';

@Entity({ name: 'post_keyboard_layout' })
export class PostKeyboardLayoutEntity extends CoreEntity {
  @Column({
    type: 'varchar',
    length: 200,
  })
  layoutName: string;

  @Column({
    type: 'json',
  })
  keyboardLayout: object;

  @Column({
    type: 'json',
  })
  layoutOptions: number[];

  @Column({
    type: 'json',
    nullable: true,
  })
  partsOnLayout: object | null;

  @OneToOne(() => PostEntity, (post) => post.postKeyboardLayout, { onDelete: 'CASCADE' })
  @JoinColumn()
  post: PostEntity;
}
