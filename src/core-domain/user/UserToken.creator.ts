import { Injectable } from '@nestjs/common';

import { UserTokenRepository } from '@src/database/entity/User/UserToken.repository';

import { CreateUserTokenData } from '@src/core-domain/user/data/CreateUserTokenData';

@Injectable()
export class UserTokenCreator {
  constructor(private readonly userTokenRepository: UserTokenRepository) {}

  async createUserToken(createUserToken: CreateUserTokenData): Promise<void> {
    await this.userTokenRepository.createUserToken(createUserToken);
  }
}
