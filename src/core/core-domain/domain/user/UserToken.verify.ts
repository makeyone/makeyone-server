import { Injectable, NotFoundException } from '@nestjs/common';

import { CoreErrorType } from '@src/core/core-domain/support/error/CoreErrorType';

import { UserTokenRepository } from '@src/database/entity/User/UserToken.repository';

@Injectable()
export class UserTokenVerify {
  constructor(private readonly userTokenRepository: UserTokenRepository) {}

  async verifyRefreshToken(refreshToken: string): Promise<boolean> {
    const userToken = await this.userTokenRepository.findUserTokenByRefreshToken(refreshToken);
    if (!userToken) {
      throw new NotFoundException(CoreErrorType.USER_TOKEN_NOT_FOUND);
    }

    return true;
  }
}
