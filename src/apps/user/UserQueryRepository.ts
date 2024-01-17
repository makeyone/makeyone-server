import { Repository } from 'typeorm';

import { CustomRepository } from '@src/libs/entity/decorators/TypeOrmCustomRepository.decorator';
import { UserEntity } from '@src/libs/entity/domain/user/User.entity';

@CustomRepository(UserEntity)
export class UserQueryRepository extends Repository<UserEntity> {
  async findUserById(userId: number): Promise<UserEntity> {
    const row = await this.findOne({
      select: ['id', 'socialProvider', 'email', 'nickname', 'profileImg', 'role'],
      where: { id: userId },
    });
    return row;
  }

  async findUserByEmail(userEmail: string): Promise<UserEntity> {
    const row = await this.findOne({
      select: ['id', 'socialProvider', 'email', 'nickname', 'profileImg', 'role'],
      where: { email: userEmail },
    });
    return row;
  }
}
