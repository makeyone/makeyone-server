import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ValidateUserIfNotAdminData } from '@src/core/core-domain/domain/user/data/ValidateUserIfNotAdminData';
import { CoreErrorType } from '@src/core/core-domain/support/error/CoreErrorType';

@Injectable()
export class UserValidator {
  constructor() {}

  async validateUserIfNotAdmin({ myUserId, targetUserId, myUserRole }: ValidateUserIfNotAdminData): Promise<boolean> {
    if (myUserRole !== 'ADMIN' && myUserId !== targetUserId) {
      throw new UnauthorizedException(CoreErrorType.DO_NOT_HAVE_PERMISSION);
    }

    return true;
  }
}
