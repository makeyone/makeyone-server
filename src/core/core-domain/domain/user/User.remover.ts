import { Injectable } from '@nestjs/common';

import { UserRepository } from '@src/database/entity/User/User.repository';

@Injectable()
export class UserRemover {
  constructor(private readonly userRepository: UserRepository) {}

  async withdrawal(targetUserId: number): Promise<void> {
    await this.userRepository.withdrawal(targetUserId);
  }
}
