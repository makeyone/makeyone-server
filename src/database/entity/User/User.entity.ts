import { Column, Entity } from 'typeorm';

import { BaseEntity } from '@src/database/entity/Base.entity';

import { userGenderKeys, UserGenderUnion } from '@src/core-enum/user/UserGender.enum';
import { userRoleKeys, UserRoleUnion } from '@src/core-enum/user/UserRole.enum';
import { userSocialProviderKeys, UserSocialProviderUnion } from '@src/core-enum/user/UserSocialProvider.enum';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
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
}
