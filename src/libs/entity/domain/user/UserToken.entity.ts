import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { CoreEntity } from '@src/libs/entity/domain/common/Core.entity';
import { UserEntity } from '@src/libs/entity/domain/user/User.entity';

@Entity({ name: 'user_token' })
export class UserTokenEntity extends CoreEntity {
  @Column({ type: 'varchar', length: 500, nullable: true })
  refreshToken: string | null;

  @Column({ type: 'datetime', nullable: true })
  refreshTokenExp: Date | null;

  @OneToOne(() => UserEntity, (user) => user.token)
  @JoinColumn()
  user: UserEntity;
}
