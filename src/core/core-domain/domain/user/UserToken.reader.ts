import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { ExpiredUserTokenResult } from '@src/core/core-domain/domain/user/result/ExpiredUserTokenResult';

import { UserTokenRepository } from '@src/database/entity/User/UserToken.repository';

@Injectable()
export class UserTokenReader {
  constructor(private readonly userTokenRepository: UserTokenRepository) {}

  async findExpiredUserTokenList(): Promise<ExpiredUserTokenResult[]> {
    const expiredUserTokenList = await this.userTokenRepository.findExpiredUserTokenList();
    return plainToInstance(ExpiredUserTokenResult, expiredUserTokenList);
  }
}
