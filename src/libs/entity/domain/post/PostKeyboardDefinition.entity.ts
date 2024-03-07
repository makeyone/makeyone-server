import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { CoreEntity } from '@src/libs/entity/domain/common/Core.entity';
import { PostEntity } from '@src/libs/entity/domain/post/Post.entity';
import { PostKeyboardLayoutType } from '@src/libs/entity/domain/post/types/PostKeyboardLayout.type';

@Entity({ name: 'post_keyboard_definition' })
export class PostKeyboardDefinitionEntity extends CoreEntity {
  @Column({
    type: 'varchar',
    length: 200,
  })
  definitionName: string;

  @Column({
    type: 'json',
  })
  keyboardDefinition: PostKeyboardLayoutType;

  @Column({
    type: 'json',
  })
  layoutOptionKeys: number[];

  @OneToOne(() => PostEntity, (post) => post.postKeyboardDefinition, { onDelete: 'CASCADE' })
  @JoinColumn()
  post: PostEntity;
}
