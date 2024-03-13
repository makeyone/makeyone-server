import { Column, Entity, ManyToOne } from 'typeorm';

import { CoreEntity } from '@src/libs/entity/domain/common/Core.entity';
import {
  keyboardPlateTextureKeys,
  KeyboardPlateTextureUnion,
} from '@src/libs/entity/domain/post/enums/KeyboardPlateTexture.enum';
import { PostEntity } from '@src/libs/entity/domain/post/Post.entity';

@Entity({ name: 'post_plate' })
export class PostPlateEntity extends CoreEntity {
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

  @ManyToOne(() => PostEntity, (post) => post.postPlate, {
    onDelete: 'CASCADE',
  })
  post: PostEntity;
}
