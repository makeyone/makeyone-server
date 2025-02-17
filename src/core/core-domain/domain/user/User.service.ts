import { Injectable, NotFoundException } from '@nestjs/common';

import { FindUserResult } from '@src/core/core-domain/domain/user/result/FindUserResult';
import { UserCreator } from '@src/core/core-domain/domain/user/User.creator';
import { UserReader } from '@src/core/core-domain/domain/user/User.reader';
import { CoreErrorType } from '@src/core/core-domain/support/error/CoreErrorType';

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
