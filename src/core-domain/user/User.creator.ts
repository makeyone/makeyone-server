import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { UserRepository } from '@src/database/entity/User/User.repository';

import { CreateUserData } from '@src/core-domain/user/data/CreateUserData';
import { CreatedUserResult } from '@src/core-domain/user/result/CreatedUserResult';

@Injectable()
export class UserCreator {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUser: CreateUserData): Promise<CreatedUserResult> {
    const user = await this.userRepository.createUser(createUser);

    return plainToInstance(CreatedUserResult, user);
  }
}
