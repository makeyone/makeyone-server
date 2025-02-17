import * as dayjs from 'dayjs';
import { Repository } from 'typeorm';

import { CreateUserTokenData } from '@src/core/core-domain/domain/user/data/CreateUserTokenData';

import { CustomRepository } from '@src/database/decorator/TypeOrmCustomRepository.decorator';
import { UserTokenEntity } from '@src/database/entity/User/UserToken.entity';

@CustomRepository(UserTokenEntity)
export class UserTokenRepository extends Repository<UserTokenEntity> {
  async createUserToken(createUserToken: CreateUserTokenData): Promise<void> {
    await this.save(
      this.create({
        refreshToken: createUserToken.refreshToken,
        refreshTokenExp: createUserToken.refreshTokenExpireAt,
        user: { id: createUserToken.targetUserId },
      }),
    );
  }

  async removeUserTokenByRefreshToken(refreshToken: string): Promise<void> {
    await this.delete({ refreshToken });
  }

  async removeUserTokenById(id: number): Promise<void> {
    await this.delete(id);
  }

  async findUserTokenByRefreshToken(refreshToken: string): Promise<UserTokenEntity> {
    const row = await this.findOne({ where: { refreshToken } });
    return row;
  }

  async findExpiredUserTokenList(): Promise<UserTokenEntity[]> {
    const currentTime = dayjs().valueOf();
    const rows = await this.createQueryBuilder('ut')
      .select(['ut.id'])
      .where('(UNIX_TIMESTAMP(ut.refresh_token_exp) * 1000) <= :currentTime', { currentTime })
      .getMany();

    return rows;
  }
}
