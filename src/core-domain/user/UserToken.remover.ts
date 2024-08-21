import { Injectable } from '@nestjs/common';

import { UserTokenRepository } from '@src/database/entity/User/UserToken.repository';

import { UserTokenReader } from '@src/core-domain/user/UserToken.reader';

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
