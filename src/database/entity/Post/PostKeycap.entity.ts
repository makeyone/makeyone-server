import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '@src/database/entity/Base.entity';
import { PostEntity } from '@src/database/entity/Post/Post.entity';

import { keyboardKeycapProfileKeys, KeyboardKeycapProfileUnion } from '@src/core-enum/Post/KeyboardKeycapProfile.enum';
import { keyboardKeycapTextureKeys, KeyboardKeycapTextureUnion } from '@src/core-enum/Post/KeyboardKeycapTexture.enum';

@Entity({ name: 'post_keycap' })
@Index('idx_post', ['post'])
export class PostKeycapEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 200,
  })
  keycapName: string;

  @Column({
    type: 'enum',
    enum: keyboardKeycapProfileKeys,
  })
  keycapProfile: KeyboardKeycapProfileUnion;

  @Column({
    type: 'enum',
    enum: keyboardKeycapTextureKeys,
  })
  keycapTexture: KeyboardKeycapTextureUnion;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    comment: '제조사',
  })
  manufacturer: string | null;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: true,
    comment: '특이사항',
  })
  remark: string | null;

  @ManyToOne(() => PostEntity, {
    createForeignKeyConstraints: false,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
  post: PostEntity;
}
