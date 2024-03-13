import { Column, Entity, ManyToOne } from 'typeorm';

import { CoreEntity } from '@src/libs/entity/domain/common/Core.entity';
import { PostEntity } from '@src/libs/entity/domain/post/Post.entity';

@Entity({ name: 'post_foam' })
export class PostFoamEntity extends CoreEntity {
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

  @ManyToOne(() => PostEntity, (post) => post.postFoam, {
    onDelete: 'CASCADE',
  })
  post: PostEntity;
}
