import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import {
  keyboardStabilizerMountKeys,
  KeyboardStabilizerMountUnion,
} from '@src/core/core-enum/Post/KeyboardStabilizerMount.enum';
import {
  keyboardStabilizerTypeKeys,
  KeyboardStabilizerTypeUnion,
} from '@src/core/core-enum/Post/KeyboardStabilizerType.enum';

import { BaseEntity } from '@src/database/entity/Base.entity';
import { PostEntity } from '@src/database/entity/Post/Post.entity';

@Entity({ name: 'post_stabilizer' })
@Index('idx_post', ['post'])
export class PostStabilizerEntity extends BaseEntity {
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

  @ManyToOne(() => PostEntity, {
    createForeignKeyConstraints: false,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
  post: PostEntity;
}
