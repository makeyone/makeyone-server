import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { keyboardSwitchLubeKeys, KeyboardSwitchLubeUnion } from '@src/core/core-enum/Post/KeyboardSwitchLube.enum';
import { keyboardSwitchTypeKeys, KeyboardSwitchTypeUnion } from '@src/core/core-enum/Post/KeyboardSwitchType.enum';

import { BaseEntity } from '@src/database/entity/Base.entity';
import { PostEntity } from '@src/database/entity/Post/Post.entity';

@Entity({ name: 'post_switch' })
@Index('idx_post', ['post'])
export class PostSwitchEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 100,
  })
  switchName: string;

  @Column({
    type: 'enum',
    enum: keyboardSwitchTypeKeys,
  })
  switchType: KeyboardSwitchTypeUnion;

  @Column({
    type: 'boolean',
  })
  isSlientSwitch: boolean;

  @Column({
    type: 'enum',
    enum: keyboardSwitchLubeKeys,
  })
  switchLube: KeyboardSwitchLubeUnion;

  @Column({
    type: 'double',
    nullable: true,
    comment: '바닥압 (단위: g)',
  })
  bottomOutForce: number | null;

  @Column({
    type: 'double',
    nullable: true,
    comment: '스프링 길이 (단위: mm)',
  })
  springLength: number | null;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  switchFilm: string | null;

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
