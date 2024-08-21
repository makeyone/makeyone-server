import { Injectable, NotFoundException } from '@nestjs/common';

import { CoreErrorType } from '@src/core-api/support/error/CoreErrorType';

import { FindUserResult } from '@src/core-domain/user/result/FindUserResult';
import { UserCreator } from '@src/core-domain/user/User.creator';
import { UserReader } from '@src/core-domain/user/User.reader';

@Injectable()
export class UserService {
  constructor(private readonly userReader: UserReader, private readonly userCreator: UserCreator) {}

  async findUserById(userId: number): Promise<FindUserResult> {
    const user = await this.userReader.findUserById(userId);
    if (!user) {
      throw new NotFoundException(CoreErrorType.USER_NOT_FOUND);
    }

    return user;
  }
}
