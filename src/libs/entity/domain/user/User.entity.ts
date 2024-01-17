import { Column, Entity, OneToOne } from 'typeorm';

import { CoreEntity } from '@src/libs/entity/domain/common/Core.entity';
import { UserGenderUnion, userGenderKeys } from '@src/libs/entity/domain/user/enums/UserGender.enum';
import { UserRoleUnion, userRoleKeys } from '@src/libs/entity/domain/user/enums/UserRole.enum';
import { UserSocialProviderUnion, userSocialProviderKeys } from '@src/libs/entity/domain/user/enums/UserSocialProvider.enum';
import { UserTokenEntity } from '@src/libs/entity/domain/user/UserToken.entity';

@Entity({ name: 'user' })
export class UserEntity extends CoreEntity {
  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: userRoleKeys,
  })
  role: UserRoleUnion;

  @Column({
    type: 'enum',
    enum: userSocialProviderKeys,
  })
  socialProvider: UserSocialProviderUnion;

  @Column({
    type: 'varchar',
    length: 100,
  })
  socialProviderId: string;

  @Column({
    type: 'varchar',
    length: 254,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  nickname: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  profileImg: string | null;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  age: string | null;

  @Column({
    type: 'enum',
    enum: userGenderKeys,
  })
  gender: UserGenderUnion;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  birthday: string | null;

  @Column({
    type: 'varchar',
    length: 4,
    nullable: true,
  })
  birthyear: string | null;

  @OneToOne(() => UserTokenEntity, (token) => token.user)
  token: UserTokenEntity;
}
