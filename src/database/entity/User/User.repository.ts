import { Repository } from 'typeorm';

import { CustomRepository } from '@src/database/decorator/TypeOrmCustomRepository.decorator';
import { UserEntity } from '@src/database/entity/User/User.entity';

import { CreateUserData } from '@src/core-domain/user/data/CreateUserData';

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
}
