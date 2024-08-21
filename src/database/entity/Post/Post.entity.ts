import { Column, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '@src/database/entity/Base.entity';
import { UserEntity } from '@src/database/entity/User/User.entity';

@Entity({ name: 'post' })
@Index('idx_posted_user', ['postedUser'])
export class PostEntity extends BaseEntity {
  @DeleteDateColumn({ select: false })
  deletedAt: Date | null;

  @Column({
    type: 'boolean',
    default: false,
  })
  isPublished: boolean;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  postTitle: string | null;

  @Column({
    type: 'longtext',
    nullable: true,
  })
  postContent: string | null;

  @ManyToOne(() => UserEntity, {
    createForeignKeyConstraints: false,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'posted_user_id', referencedColumnName: 'id' })
  postedUser: UserEntity | null;
}
