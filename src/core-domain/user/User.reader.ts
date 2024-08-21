import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { UserRepository } from '@src/database/entity/User/User.repository';

import { FindUserResult } from '@src/core-domain/user/result/FindUserResult';

@Injectable()
export class UserReader {
  constructor(private readonly userRepository: UserRepository) {}

  async findUserById(userId: number): Promise<FindUserResult> {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      return null;
    }

    return plainToInstance(FindUserResult, user);
  }

  async findUserByEmail(email: string): Promise<FindUserResult> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      return null;
    }

    return plainToInstance(FindUserResult, user);
  }
}
