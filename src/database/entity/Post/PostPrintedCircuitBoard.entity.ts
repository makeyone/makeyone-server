import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import {
  keyboardPrintedCircuitBoardTypeKeys,
  KeyboardPrintedCircuitBoardTypeUnion,
} from '@src/core/core-enum/Post/KeyboardPCBType.enum';

import { BaseEntity } from '@src/database/entity/Base.entity';
import { PostEntity } from '@src/database/entity/Post/Post.entity';

@Entity({ name: 'post_printed_circuit_board' })
@Index('idx_post', ['post'])
export class PostPrintedCircuitBoardEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 200,
  })
  pcbName: string;

  @Column({
    type: 'enum',
    enum: keyboardPrintedCircuitBoardTypeKeys,
  })
  pcbType: KeyboardPrintedCircuitBoardTypeUnion;

  @Column({
    type: 'boolean',
  })
  isRgbPcb: boolean;

  @Column({
    type: 'boolean',
  })
  isFlexCutPcb: boolean;

  @Column({
    type: 'double',
    nullable: true,
  })
  pcbThickness: number;

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
