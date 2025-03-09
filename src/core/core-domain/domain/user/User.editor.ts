import { Injectable } from '@nestjs/common';

import { UserRepository } from '@src/database/entity/User/User.repository';

@Injectable()
export class UserEditor {
  constructor(private readonly userRepository: UserRepository) {}

  async editUserNickname(targetUserId: number, nickname: string): Promise<void> {
    await this.userRepository.editUserNickname(targetUserId, nickname);
  }

  async editUserProfileImgUrl(targetUserId: number, profileImgUrl: string): Promise<void> {
    await this.userRepository.editUserProfileImgUrl(targetUserId, profileImgUrl);
  }
}
