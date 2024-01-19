import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { UserEntity } from '@src/libs/entity/domain/user/User.entity';

import { CreateUserInput, CreateUserOutput } from '@src/apps/user/dto/CreateUser.dto';
import { GetMeOutput } from '@src/apps/user/dto/GetMe.dto';
import { GetUserByEmailOutput, GetUserByEmailQuery } from '@src/apps/user/dto/GetUserByEmail.dto';
import { GetUserByIdOutput, GetUserByIdParam } from '@src/apps/user/dto/GetUserById.dto';
import { UserQueryRepository } from '@src/apps/user/UserQueryRepository';

@Injectable()
export class UserService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userQueryRepository: UserQueryRepository,
  ) {}

  async getMe(me: UserEntity): Promise<GetMeOutput> {
    return {
      ok: true,
      me: me || null,
    };
  }

  async getUserById({ userId }: GetUserByIdParam): Promise<GetUserByIdOutput> {
    const user = await this.userQueryRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    return {
      ok: true,
      user,
    };
  }

  async getUserByEmail({ userEmail }: GetUserByEmailQuery): Promise<GetUserByEmailOutput> {
    const user = await this.userQueryRepository.findUserByEmail(userEmail);
    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    return {
      ok: true,
      user,
    };
  }

  async createUser({
    socialProvider,
    socialProviderId,
    email,
    nickname,
    gender,
    profileImg,
    age,
    birthday,
    birthyear,
  }: CreateUserInput): Promise<CreateUserOutput> {
    const createdUser = await this.dataSource.transaction(async (manager) => {
      const userRepository = manager.withRepository(this.userRepository);
      const userQueryRepository = manager.withRepository(this.userQueryRepository);

      const existUser = await userQueryRepository.findUserByEmail(email);
      if (existUser) {
        throw new ForbiddenException('ALREADY_REGISTERED_USER');
      }

      const createdUser = await userRepository.save(
        this.userRepository.create({
          role: 'CLIENT',
          socialProvider,
          socialProviderId,
          email,
          nickname,
          gender,
          ...(profileImg && { profileImg }),
          ...(age && { age }),
          ...(birthday && { birthday }),
          ...(birthyear && { birthyear }),
        }),
      );
      return createdUser;
    });

    return {
      ok: true,
      createdUser: {
        id: createdUser.id,
        socialProvider: createdUser.socialProvider,
        email: createdUser.email,
        nickname: createdUser.nickname,
        profileImg: createdUser.profileImg,
        role: createdUser.role,
      },
    };
  }
}
