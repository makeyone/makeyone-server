import { Column, Entity, ManyToOne } from 'typeorm';

import { IncludeSoftDeleteCoreEntity } from '@src/libs/entity/domain/common/Core.entity';
import { UserEntity } from '@src/libs/entity/domain/user/User.entity';

@Entity({ name: 'post' })
export class PostEntity extends IncludeSoftDeleteCoreEntity {
  @Column({ type: 'varchar', length: 200, nullable: true })
  postTitle: string | null;

  @ManyToOne(() => UserEntity, (user) => user.posts, {
    onDelete: 'NO ACTION',
  })
  postedUser: UserEntity;
}
