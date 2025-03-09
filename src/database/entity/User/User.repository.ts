import { Repository } from 'typeorm';

import { CreateUserData } from '@src/core/core-domain/domain/user/data/CreateUserData';

import { CustomRepository } from '@src/database/decorator/TypeOrmCustomRepository.decorator';
import { UserEntity } from '@src/database/entity/User/User.entity';

@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUser(createUser: CreateUserData): Promise<UserEntity> {
    const createdUser = await this.save(
      this.create({
        role: 'CLIENT',
        ...createUser,
      }),
    );

    return createdUser;
  }

  async findUserById(userId: number): Promise<UserEntity> {
    const row = await this.findOne({
      where: { id: userId },
    });
    return row;
  }

  async findUserByEmail(userEmail: string): Promise<UserEntity> {
    const row = await this.findOne({
      where: { email: userEmail },
    });
    return row;
  }

  async editUserNickname(targetUserId: number, nickname: string): Promise<UserEntity> {
    const row = await this.save({ id: targetUserId, nickname });
    return row;
  }

  async editUserProfileImgUrl(targetUserId: number, profileImgUrl: string): Promise<UserEntity> {
    const row = await this.save({ id: targetUserId, profileImg: profileImgUrl });
    return row;
  }
}
