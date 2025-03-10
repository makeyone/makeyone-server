import { Injectable, NotFoundException } from '@nestjs/common';

import { UserRoleUnion } from '@src/core/core-enum/user/UserRole.enum';

import { EditUserData } from '@src/core/core-domain/domain/user/data/EditUserData';
import { FindUserResult } from '@src/core/core-domain/domain/user/result/FindUserResult';
import { UserEditor } from '@src/core/core-domain/domain/user/User.editor';
import { UserReader } from '@src/core/core-domain/domain/user/User.reader';
import { UserRemover } from '@src/core/core-domain/domain/user/User.remover';
import { UserValidator } from '@src/core/core-domain/domain/user/User.validator';
import { CoreErrorType } from '@src/core/core-domain/support/error/CoreErrorType';

@Injectable()
export class UserService {
  constructor(
    private readonly userReader: UserReader,
    private readonly userValidator: UserValidator,
    private readonly userEditor: UserEditor,
    private readonly userRemover: UserRemover,
  ) {}

  async findUserById(userId: number): Promise<FindUserResult> {
    const user = await this.userReader.findUserById(userId);
    if (!user) {
      throw new NotFoundException(CoreErrorType.USER_NOT_FOUND);
    }

    return user;
  }

  async editUser(
    myUserId: number,
    myUserRole: UserRoleUnion,
    { editUserId, nickname, profileImgUrl }: EditUserData,
  ): Promise<FindUserResult> {
    await this.userValidator.validateUserIfNotAdmin({ myUserId, myUserRole, targetUserId: editUserId });

    if (nickname) {
      await this.userEditor.editUserNickname(editUserId, nickname);
    }

    if (profileImgUrl) {
      await this.userEditor.editUserProfileImgUrl(editUserId, profileImgUrl);
    }

    const editedUser = await this.userReader.findUserById(editUserId);
    return editedUser;
  }

  async withdrawal(myUserId: number, myUserRole: UserRoleUnion, withdrawalUserId: number): Promise<number> {
    await this.userValidator.validateUserIfNotAdmin({ myUserId, myUserRole, targetUserId: withdrawalUserId });
    await this.userRemover.withdrawal(withdrawalUserId);

    return withdrawalUserId;
  }
}
