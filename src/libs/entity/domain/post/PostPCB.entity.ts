import { Column, Entity, ManyToOne } from 'typeorm';

import { CoreEntity } from '@src/libs/entity/domain/common/Core.entity';
import { keyboardPCBTypeKeys, KeyboardPCBTypeUnion } from '@src/libs/entity/domain/post/enums/KeyboardPCBType.enum';
import { PostEntity } from '@src/libs/entity/domain/post/Post.entity';

@Entity({ name: 'post_pcb' })
export class PostPCBEntity extends CoreEntity {
  @Column({
    type: 'varchar',
    length: 200,
  })
  pcbName: string;

  @Column({
    type: 'enum',
    enum: keyboardPCBTypeKeys,
  })
  pcbType: KeyboardPCBTypeUnion;

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

  @ManyToOne(() => PostEntity, (post) => post.postPCB, {
    onDelete: 'CASCADE',
  })
  post: PostEntity;
}
