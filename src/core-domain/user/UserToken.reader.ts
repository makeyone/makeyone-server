import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { UserTokenRepository } from '@src/database/entity/User/UserToken.repository';

import { ExpiredUserTokenResult } from '@src/core-domain/user/result/ExpiredUserTokenResult';

@Injectable()
export class UserTokenReader {
  constructor(private readonly userTokenRepository: UserTokenRepository) {}

  async findExpiredUserTokenList(): Promise<ExpiredUserTokenResult[]> {
    const expiredUserTokenList = await this.userTokenRepository.findExpiredUserTokenList();
    return plainToInstance(ExpiredUserTokenResult, expiredUserTokenList);
  }
}
