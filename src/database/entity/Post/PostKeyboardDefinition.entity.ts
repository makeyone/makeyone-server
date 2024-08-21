import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';

import { BaseEntity } from '@src/database/entity/Base.entity';
import { PostEntity } from '@src/database/entity/Post/Post.entity';
import { PostKeyboardDefinitionType } from '@src/database/entity/Post/type/PostKeyboardLayout.type';

@Entity({ name: 'post_keyboard_definition' })
@Index('idx_post', ['post'])
export class PostKeyboardDefinitionEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 200,
  })
  definitionName: string;

  @Column({
    type: 'json',
  })
  keyboardDefinition: PostKeyboardDefinitionType;

  @Column({
    type: 'json',
  })
  layoutOptionKeys: number[];

  @OneToOne(() => PostEntity, {
    createForeignKeyConstraints: false,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
  post: PostEntity;
}
