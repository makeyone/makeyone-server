import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { UserTokenRemover } from '@src/core-domain/user/UserToken.remover';

@Injectable()
export class UserTokenCron {
  constructor(private readonly userTokenRemover: UserTokenRemover) {}

  @Cron(process.env.NODE_ENV === 'prod' ? '0 */1 * * *' : '0 */1 * * *', { name: 'remove-expired-refresh-token' })
  async removeExpiredUserToken(): Promise<void> {
    await this.userTokenRemover.removeExpiredUserToken();
  }
}
