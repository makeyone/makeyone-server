import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import {
  keyboardPlateTextureKeys,
  KeyboardPlateTextureUnion,
} from '@src/core/core-enum/Post/KeyboardPlateTexture.enum';

import { BaseEntity } from '@src/database/entity/Base.entity';
import { PostEntity } from '@src/database/entity/Post/Post.entity';

@Entity({ name: 'post_plate' })
@Index('idx_post', ['post'])
export class PostPlateEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 200,
  })
  plateName: string;

  @Column({
    type: 'enum',
    enum: keyboardPlateTextureKeys,
  })
  plateTexture: KeyboardPlateTextureUnion;

  @Column({
    type: 'boolean',
  })
  isFlexCutPlate: boolean;

  @Column({
    type: 'boolean',
  })
  isHalfPlate: boolean;

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
