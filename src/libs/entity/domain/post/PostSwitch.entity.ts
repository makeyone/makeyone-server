import { Column, Entity, ManyToOne } from 'typeorm';

import { CoreEntity } from '@src/libs/entity/domain/common/Core.entity';
import { KeyboardSwitchLubeUnion, keyboardSwitchLubeKeys } from '@src/libs/entity/domain/post/enums/KeyboardSwitchLube.enum';
import { KeyboardSwitchTypeUnion, keyboardSwitchTypeKeys } from '@src/libs/entity/domain/post/enums/KeyboardSwitchType.enum';
import { PostEntity } from '@src/libs/entity/domain/post/Post.entity';

@Entity({ name: 'post_switch' })
export class PostSwitchEntity extends CoreEntity {
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

  @ManyToOne(() => PostEntity, (post) => post.postSwitches, {
    onDelete: 'CASCADE',
  })
  post: PostEntity;
}
