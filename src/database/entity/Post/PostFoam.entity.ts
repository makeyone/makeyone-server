import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';

import { BaseEntity } from '@src/database/entity/Base.entity';
import { PostEntity } from '@src/database/entity/Post/Post.entity';

@Entity({ name: 'post_foam' })
@Index('idx_post', ['post'])
export class PostFoamEntity extends BaseEntity {
  @Column({
    type: 'boolean',
    comment: '기보강 흠읍재',
  })
  plateBetweenPCBFoam: boolean;

  @Column({
    type: 'boolean',
    comment: '스위치 하부 PE폼 흡음재',
  })
  bottomSwitchPEFoam: boolean;

  @Column({
    type: 'boolean',
    comment: '하부 흡음재',
  })
  bottomFoam: boolean;

  @Column({
    type: 'boolean',
    comment: '테이프모드',
  })
  tapeMod: boolean;

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
