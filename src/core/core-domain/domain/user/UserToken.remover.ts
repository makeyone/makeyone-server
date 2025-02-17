import { Injectable } from '@nestjs/common';

import { UserTokenReader } from '@src/core/core-domain/domain/user/UserToken.reader';

import { UserTokenRepository } from '@src/database/entity/User/UserToken.repository';

@Injectable()
export class UserTokenRemover {
  constructor(
    private readonly userTokenRepository: UserTokenRepository,
    private readonly userTokenReader: UserTokenReader,
  ) {}

  async removeUserTokenByRefreshToken(refreshToken: string): Promise<void> {
    await this.userTokenRepository.removeUserTokenByRefreshToken(refreshToken);
  }

  async removeExpiredUserToken(): Promise<void> {
    const expiredUserTokenList = await this.userTokenReader.findExpiredUserTokenList();

    if (expiredUserTokenList.length > 0) {
      for (const userToken of expiredUserTokenList) {
        await this.userTokenRepository.removeUserTokenById(userToken.id);
      }
    }
  }
}
