import { Column, Entity, ManyToOne } from 'typeorm';

import { CoreEntity } from '@src/libs/entity/domain/common/Core.entity';
import {
  KeyboardStabilizerMountUnion,
  keyboardStabilizerMountKeys,
} from '@src/libs/entity/domain/post/enums/KeyboardStabilizerMount.enum';
import {
  KeyboardStabilizerTypeUnion,
  keyboardStabilizerTypeKeys,
} from '@src/libs/entity/domain/post/enums/KeyboardStabilizerType.enum';
import { PostEntity } from '@src/libs/entity/domain/post/Post.entity';

@Entity({ name: 'post_stabilizer' })
export class PostStabilizerEntity extends CoreEntity {
  @Column({
    type: 'varchar',
    length: 100,
  })
  stabilizerName: string;

  @Column({
    type: 'enum',
    enum: keyboardStabilizerTypeKeys,
  })
  stabilizerType: KeyboardStabilizerTypeUnion;

  @Column({
    type: 'enum',
    enum: keyboardStabilizerMountKeys,
  })
  stabilizerMount: KeyboardStabilizerMountUnion;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: true,
    comment: '특이사항',
  })
  remark: string | null;

  @ManyToOne(() => PostEntity, (post) => post.postStabilizers, {
    onDelete: 'CASCADE',
  })
  post: PostEntity;
}
