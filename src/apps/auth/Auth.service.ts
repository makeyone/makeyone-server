import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { Response } from 'express';
import { Repository } from 'typeorm';

import { UserGenderUnion } from '@src/libs/entity/domain/user/enums/UserGender.enum';
import { UserSocialProvider } from '@src/libs/entity/domain/user/enums/UserSocialProvider.enum';
import { UserEntity } from '@src/libs/entity/domain/user/User.entity';
import { UserTokenEntity } from '@src/libs/entity/domain/user/UserToken.entity';
import infoLog from '@src/libs/logger/InfoLog';

import { LoginInput, LoginOutput } from '@src/apps/auth/dto/Login.dto';
import { LogoutOutput } from '@src/apps/auth/dto/Logout.dto';
import { RefreshTokenInput, RefreshTokenOutput } from '@src/apps/auth/dto/RefreshToken.dto';
import getDiscordUserProfile from '@src/apps/auth/external-request/GetDiscordUserProfile';
import getGoogleUserProfile from '@src/apps/auth/external-request/GetGoogleUserProfile';
import getKakaoUserProfile from '@src/apps/auth/external-request/GetKakaoUserProfile';
import getNaverUserProfile from '@src/apps/auth/external-request/GetNaverUserProfile';
import { JwtService } from '@src/apps/jwt/Jwt.service';
import { UserService } from '@src/apps/user/User.service';
import { UserQueryRepository } from '@src/apps/user/UserQueryRepository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserTokenEntity)
    private readonly userTokenRepository: Repository<UserTokenEntity>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly userQueryRepository: UserQueryRepository,
  ) {}

  async login(res: Response, { socialProvider, accessToken, email }: LoginInput): Promise<LoginOutput> {
    let socialProviderId = '';
    let nickname = '';
    let gender: UserGenderUnion = 'Unknown';
    let profileImg = null;
    let age = null;
    let birthday = null;
    let birthyear = null;

    if (UserSocialProvider.NAVER.equals(socialProvider)) {
      const naverUserProfile = await getNaverUserProfile({ accessToken });
      socialProviderId = naverUserProfile.id;
      nickname = naverUserProfile.nickname;
      gender = naverUserProfile?.gender === 'M' ? 'Male' : naverUserProfile?.gender === 'F' ? 'Female' : 'Unknown';
      profileImg = naverUserProfile.profileImage || null;
      age = naverUserProfile.age || null;
      birthday = naverUserProfile.birthday || null;
      birthyear = naverUserProfile.birthyear || null;
    }

    if (UserSocialProvider.KAKAO.equals(socialProvider)) {
      const kakaoUserProfile = await getKakaoUserProfile({ accessToken });
      socialProviderId = kakaoUserProfile.id;
      nickname = kakaoUserProfile.nickname;
      gender = kakaoUserProfile?.gender === 'male' ? 'Male' : kakaoUserProfile?.gender === 'female' ? 'Female' : 'Unknown';
      profileImg = kakaoUserProfile.profileImage || null;
      age = kakaoUserProfile.age || null;
      birthday = kakaoUserProfile.birthday || null;
      birthyear = kakaoUserProfile.birthyear || null;
    }

    if (UserSocialProvider.GOOGLE.equals(socialProvider)) {
      const googleUserProfile = await getGoogleUserProfile({ accessToken });
      socialProviderId = googleUserProfile.id;
      nickname = googleUserProfile.nickname;
      gender = 'Unknown';
      profileImg = googleUserProfile.profileImage;
      age = null;
      birthday = null;
      birthyear = null;
    }

    if (UserSocialProvider.DISCORD.equals(socialProvider)) {
      const discordUserProfile = await getDiscordUserProfile({ accessToken });
      socialProviderId = discordUserProfile.id;
      nickname = discordUserProfile.nickname;
      gender = 'Unknown';
      profileImg = discordUserProfile.profileImage;
      age = null;
      birthday = null;
      birthyear = null;
    }

    const findUser = await this.userQueryRepository.findUserByEmail(email);
    // 이메일은 존재하지만 소셜이 다른 경우 회원가입할 때 선택한 소셜 안내
    if (findUser && findUser.socialProvider !== socialProvider) {
      throw new ForbiddenException(
        'DIFFERENT_SOCIAL_PROVIDER',
        JSON.stringify({ registeredEmail: email, registeredSocialProvider: findUser.socialProvider }),
      );
    }

    let verifyUser: Pick<UserEntity, 'id' | 'socialProvider' | 'email' | 'nickname' | 'profileImg' | 'role'> = findUser;
    if (!findUser) {
      const { createdUser } = await this.userService.createUser({
        socialProvider,
        socialProviderId,
        email,
        nickname,
        gender,
        profileImg,
        age,
        birthday,
        birthyear,
      });
      verifyUser = createdUser;
    }

    const jwtAccessToken = await this.jwtService.signAccessToken({ id: verifyUser.id });
    const jwtRefreshToken = await this.jwtService.signRefreshToken({ id: verifyUser.id });
    const jwtRefreshTokenExp = dayjs().add(parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN, 10), 'seconds').toDate();

    const registeredToken = await this.userTokenRepository.findOne({ where: { user: { id: verifyUser.id } } });
    await this.userTokenRepository.save({
      ...(registeredToken && { id: registeredToken.id }),
      refreshToken: jwtRefreshToken,
      refreshTokenExp: jwtRefreshTokenExp,
      user: { id: verifyUser.id },
    });

    res.setHeader('Authorization', 'Bearer ' + [jwtAccessToken, jwtRefreshToken]);
    res.cookie('accessToken', jwtAccessToken, { secure: true, sameSite: 'none' });
    res.cookie('refreshToken', jwtRefreshToken, { secure: true, sameSite: 'none' });

    return {
      ok: true,
      loggedInUser: verifyUser,
      accessToken: jwtAccessToken,
      refreshToken: jwtRefreshToken,
    };
  }

  async logout(res: Response, me: UserEntity): Promise<LogoutOutput> {
    res.clearCookie('accessToken', { secure: true, sameSite: 'none' });
    res.clearCookie('refreshToken', { secure: true, sameSite: 'none' });

    if (me) {
      const registeredToken = await this.userTokenRepository.findOne({ where: { user: { id: me.id } } });
      if (registeredToken) {
        await this.userTokenRepository.save({
          id: registeredToken.id,
          refreshToken: null,
          refreshTokenExp: null,
        });
      }
    }

    return {
      ok: true,
    };
  }

  async refreshToken(res: Response, { refreshToken }: RefreshTokenInput): Promise<RefreshTokenOutput> {
    try {
      const decodedRefreshToken = await this.jwtService.verifyRefreshToken(refreshToken);
      const registeredRefreshToken = await this.userTokenRepository.findOne({ where: { refreshToken } });

      if (registeredRefreshToken === null) {
        throw new NotFoundException('REGISTERED_TOKEN_NOT_FOUND');
      }

      if (typeof decodedRefreshToken === 'object' && decodedRefreshToken.hasOwnProperty('id')) {
        const { user } = await this.userService.getUserById({ userId: decodedRefreshToken.id });

        if (!user) {
          throw new NotFoundException('USER_NOT_FOUND');
        }

        const jwtAccessToken = await this.jwtService.signAccessToken({ id: user.id });

        res.setHeader('Authorization', 'Bearer ' + jwtAccessToken);
        res.cookie('accessToken', jwtAccessToken, { secure: true, sameSite: 'none' });

        return {
          ok: true,
          accessToken: jwtAccessToken,
        };
      }
    } catch (err) {
      if (err.response.message === 'EXPIRED_JWT_REFRESH_TOKEN') {
        res.clearCookie('accessToken', { secure: true, sameSite: 'none' });
        res.clearCookie('refreshToken', { secure: true, sameSite: 'none' });
      }
    }
  }

  @Cron(process.env.NODE_ENV === 'prod' ? '0 */1 * * *' : '* */1 * * *', { name: 'remove-expired-refresh-token' })
  async removeExpiredRefreshToken() {
    const currentTime = dayjs().valueOf();
    const expiredList = await this.userTokenRepository
      .createQueryBuilder('ut')
      .select(['ut.id'])
      .where('(UNIX_TIMESTAMP(ut.refresh_token_exp) * 1000) <= :currentTime', { currentTime })
      .getMany();

    if (expiredList.length > 0) {
      for (const expired of expiredList) {
        await this.userTokenRepository.save({
          id: expired.id,
          refreshToken: null,
          refreshTokenExp: null,
        });
      }

      infoLog(expiredList.map((expired) => expired.id).join(', '), 'Remove expired refresh token');
    }
  }
}
