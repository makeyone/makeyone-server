import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';

import {
  keyboardHousingFunctionKeyLayoutKeys,
  KeyboardHousingFunctionKeyLayoutUnion,
} from '@src/core/core-enum/Post/KeyboardHousingFunctionKeyLayout.enum';
import {
  keyboardHousingLayoutKeys,
  KeyboardHousingLayoutUnion,
} from '@src/core/core-enum/Post/KeyboardHousingLayout.enum';
import {
  keyboardHousingMountKeys,
  KeyboardHousingMountUnion,
} from '@src/core/core-enum/Post/KeyboardHousingMount.enum';
import {
  keyboardHousingWindowKeyLayoutKeys,
  KeyboardHousingWindowKeyLayoutUnion,
} from '@src/core/core-enum/Post/KeyboardHousingWindowKeyLayout.enum';

import { BaseEntity } from '@src/database/entity/Base.entity';
import { PostEntity } from '@src/database/entity/Post/Post.entity';

@Entity({ name: 'post_housing' })
@Index('idx_post', ['post'])
export class PostHousingEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 200,
  })
  housingName: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  housingColor: string;

  @Column({
    type: 'boolean',
    comment: '재 아노다이징 여부',
  })
  isHousingReAnodized: boolean;

  @Column({
    type: 'enum',
    enum: keyboardHousingMountKeys,
  })
  housingMount: KeyboardHousingMountUnion;

  @Column({
    type: 'enum',
    enum: keyboardHousingLayoutKeys,
  })
  housingLayout: KeyboardHousingLayoutUnion;

  @Column({
    type: 'enum',
    enum: keyboardHousingWindowKeyLayoutKeys,
  })
  housingWindowKeyLayout: KeyboardHousingWindowKeyLayoutUnion;

  @Column({
    type: 'enum',
    enum: keyboardHousingFunctionKeyLayoutKeys,
  })
  housingFunctionKeyLayout: KeyboardHousingFunctionKeyLayoutUnion;

  @OneToOne(() => PostEntity, {
    createForeignKeyConstraints: false,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
  post: PostEntity;
}
