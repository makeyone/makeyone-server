import { Injectable } from '@nestjs/common';

import { CreateUserTokenData } from '@src/core/core-domain/domain/user/data/CreateUserTokenData';

import { UserTokenRepository } from '@src/database/entity/User/UserToken.repository';

@Injectable()
export class UserTokenCreator {
  constructor(private readonly userTokenRepository: UserTokenRepository) {}

  async createUserToken(createUserToken: CreateUserTokenData): Promise<void> {
    await this.userTokenRepository.createUserToken(createUserToken);
  }
}
