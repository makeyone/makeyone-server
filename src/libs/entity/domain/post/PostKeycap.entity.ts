import { Column, Entity, ManyToOne } from 'typeorm';

import { CoreEntity } from '@src/libs/entity/domain/common/Core.entity';
import {
  KeyboardKeycapProfileUnion,
  keyboardKeycapProfileKeys,
} from '@src/libs/entity/domain/post/enums/KeyboardKeycapProfile.enum';
import {
  KeyboardKeycapTextureUnion,
  keyboardKeycapTextureKeys,
} from '@src/libs/entity/domain/post/enums/KeyboardKeycapTexture.enum';
import { PostEntity } from '@src/libs/entity/domain/post/Post.entity';

@Entity({ name: 'post_keycap' })
export class PostKeycapEntity extends CoreEntity {
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

  @ManyToOne(() => PostEntity, (post) => post.postKeycaps, {
    onDelete: 'CASCADE',
  })
  post: PostEntity;
}
