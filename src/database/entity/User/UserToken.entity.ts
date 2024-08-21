import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';

import { BaseEntity } from '@src/database/entity/Base.entity';
import { UserEntity } from '@src/database/entity/User/User.entity';

@Entity({ name: 'user_token' })
@Index('idx_user', ['user'])
export class UserTokenEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  refreshToken: string | null;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  refreshTokenExp: Date | null;

  @OneToOne(() => UserEntity, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;
}
