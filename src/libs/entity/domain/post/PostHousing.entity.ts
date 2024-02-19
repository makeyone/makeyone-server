import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { CoreEntity } from '@src/libs/entity/domain/common/Core.entity';
import {
  KeyboardHousingFunctionKeyLayoutUnion,
  keyboardHousingFunctionKeyLayoutKeys,
} from '@src/libs/entity/domain/post/enums/KeyboardHousingFunctionKeyLayout.enum';
import {
  KeyboardHousingLayoutUnion,
  keyboardHousingLayoutKeys,
} from '@src/libs/entity/domain/post/enums/KeyboardHousingLayout.enum';
import {
  KeyboardHousingMountUnion,
  keyboardHousingMountKeys,
} from '@src/libs/entity/domain/post/enums/KeyboardHousingMount.enum';
import {
  KeyboardHousingWindowKeyLayoutUnion,
  keyboardHousingWindowKeyLayoutKeys,
} from '@src/libs/entity/domain/post/enums/KeyboardHousingWindowKeyLayout.enum';
import { PostEntity } from '@src/libs/entity/domain/post/Post.entity';

@Entity({ name: 'post_housing' })
export class PostHousingEntity extends CoreEntity {
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

  @OneToOne(() => PostEntity, (post) => post.postHousing, { onDelete: 'CASCADE' })
  @JoinColumn()
  post: PostEntity;
}
