import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import * as camelcaseKeys from 'camelcase-keys';
import { plainToInstance } from 'class-transformer';
import { fromPromise } from 'neverthrow';

import { FindDiscordUserProfileData } from '@src/core/core-domain/domain/user/data/FindDiscordUserProfileData';
import { FindGoogleUserProfileData } from '@src/core/core-domain/domain/user/data/FindGoogleUserProfileData';
import { FindKakaoUserProfileData } from '@src/core/core-domain/domain/user/data/FindKakaoUserProfileData';
import { FindNaverUserProfileData } from '@src/core/core-domain/domain/user/data/FindNaverUserProfileData';
import {
  FindDiscordUserProfileResponse,
  FindDiscordUserProfileResult,
} from '@src/core/core-domain/domain/user/result/FindDiscordUserProfileResult';
import {
  FindGoogleUserProfileResponse,
  FindGoogleUserProfileResult,
} from '@src/core/core-domain/domain/user/result/FindGoogleUserProfileResult';
import {
  FindKakaoUserProfileResponse,
  FindKakaoUserProfileResult,
} from '@src/core/core-domain/domain/user/result/FindKakaoUserProfileResult';
import {
  FindNaverUserProfileResponse,
  FindNaverUserProfileResult,
} from '@src/core/core-domain/domain/user/result/FindNaverUserProfileResult';
import { FindUserResult } from '@src/core/core-domain/domain/user/result/FindUserResult';
import { CoreErrorType } from '@src/core/core-domain/support/error/CoreErrorType';

import { UserRepository } from '@src/database/entity/User/User.repository';

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

  // NOTE: 디스코드 프로필 조회 문서 : https://discord.com/developers/docs/resources/user#user-object
  async findDiscordUserProfile({ accessToken }: FindDiscordUserProfileData): Promise<FindDiscordUserProfileResult> {
    try {
      const discordUserProfileResponse = await fromPromise(
        axios.get('https://discordapp.com/api/users/@me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
        (error) => error as Error,
      );

      if (discordUserProfileResponse.isErr()) {
        const err = discordUserProfileResponse.error;

        if (axios.isAxiosError(err) && err.response) {
          const status = err.response.status;

          if (status === 401) {
            throw new UnauthorizedException({
              errorType: CoreErrorType.GET_DISCORD_USER_PROFILE_AUTH_ERROR,
              errorData: (err.response.data as any)?.error,
            });
          }

          throw new InternalServerErrorException({
            errorType: CoreErrorType.GET_DISCORD_USER_PROFILE_SERVER_ERROR,
            errorData: (err.response.data as any)?.error,
          });
        }

        throw new InternalServerErrorException(CoreErrorType.GET_DISCORD_USER_PROFILE_SERVER_ERROR);
      }

      const discordUserProfileResponseData = plainToInstance(
        FindDiscordUserProfileResponse,
        camelcaseKeys(discordUserProfileResponse.value.data, { deep: true }),
      );

      return plainToInstance(FindDiscordUserProfileResult, {
        id: discordUserProfileResponseData.id,
        nickname: discordUserProfileResponseData.globalName,
        profileImage: `https://cdn.discordapp.com/avatars/${discordUserProfileResponseData.id}/${discordUserProfileResponseData.avatar}`,
        email: discordUserProfileResponseData.email,
      });
    } catch (err) {
      throw err;
    }
  }

  // NOTE: 구글 프로필 조회 문서 : https://developers.google.com/identity/protocols/oauth2?hl=ko
  async findGoogleUserProfile({ accessToken }: FindGoogleUserProfileData): Promise<FindGoogleUserProfileResult> {
    try {
      const googleUserProfileResponse = await fromPromise(
        axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }),
        (error) => error as Error,
      );

      if (googleUserProfileResponse.isErr()) {
        const err = googleUserProfileResponse.error;

        if (axios.isAxiosError(err) && err.response) {
          const status = err.response.status;

          if (status === 401) {
            throw new UnauthorizedException({
              errorType: CoreErrorType.GET_GOOGLE_USER_PROFILE_AUTH_ERROR,
              errorData: (err.response.data as any)?.error,
            });
          }

          throw new InternalServerErrorException({
            errorType: CoreErrorType.GET_GOOGLE_USER_PROFILE_SERVER_ERROR,
            errorData: (err.response.data as any)?.error,
          });
        }

        throw new InternalServerErrorException(CoreErrorType.GET_GOOGLE_USER_PROFILE_SERVER_ERROR);
      }

      const googleUserProfileResponseData = plainToInstance(
        FindGoogleUserProfileResponse,
        camelcaseKeys(googleUserProfileResponse.value.data, { deep: true }),
      );

      return plainToInstance(FindGoogleUserProfileResult, {
        id: googleUserProfileResponseData.sub,
        nickname: googleUserProfileResponseData.name,
        profileImage: googleUserProfileResponseData.picture,
        email: googleUserProfileResponseData.email,
      });
    } catch (err) {
      throw err;
    }
  }

  // NOTE:  카카오 프로필 조회 문서 https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#req-user-info
  async findKakaoUserProfile({ accessToken }: FindKakaoUserProfileData): Promise<FindKakaoUserProfileResult> {
    try {
      const kakaoUserProfileResponse = await fromPromise(
        axios.get('https://kapi.kakao.com/v2/user/me?secure_resource=true', {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            Authorization: `Bearer ${accessToken}`,
          },
        }),
        (error) => error as Error,
      );

      if (kakaoUserProfileResponse.isErr()) {
        const err = kakaoUserProfileResponse.error;

        if (axios.isAxiosError(err) && err.response) {
          const status = err.response.status;

          if (status === 401) {
            throw new UnauthorizedException({
              errorType: CoreErrorType.GET_KAKAO_USER_PROFILE_AUTH_ERROR,
              errorData: (err.response.data as any)?.error,
            });
          }

          throw new InternalServerErrorException({
            errorType: CoreErrorType.GET_KAKAO_USER_PROFILE_SERVER_ERROR,
            errorData: (err.response.data as any)?.error,
          });
        }

        throw new InternalServerErrorException(CoreErrorType.GET_KAKAO_USER_PROFILE_SERVER_ERROR);
      }

      const kakaoUserProfileResponseData = plainToInstance(
        FindKakaoUserProfileResponse,
        camelcaseKeys(kakaoUserProfileResponse.value.data, { deep: true }),
      );

      return plainToInstance(FindKakaoUserProfileResult, {
        id: kakaoUserProfileResponseData.id.toString(),
        nickname: kakaoUserProfileResponseData.kakaoAccount.profile.nickname,
        profileImage: kakaoUserProfileResponseData.kakaoAccount.profile.profileImageUrl,
        email: kakaoUserProfileResponseData.kakaoAccount.email,
        ...(kakaoUserProfileResponseData.kakaoAccount.agRange && {
          age: kakaoUserProfileResponseData.kakaoAccount.agRange,
        }),
        ...(kakaoUserProfileResponseData.kakaoAccount.gender && {
          gender: kakaoUserProfileResponseData.kakaoAccount.gender,
        }),
        ...(kakaoUserProfileResponseData.kakaoAccount.birthday && {
          birthday: kakaoUserProfileResponseData.kakaoAccount.birthday,
        }),
        ...(kakaoUserProfileResponseData.kakaoAccount.birthyear && {
          birthyear: kakaoUserProfileResponseData.kakaoAccount.birthyear,
        }),
      });
    } catch (err) {
      throw err;
    }
  }

  // NOTE: 네이버 프로필 조회 문서 https://developers.naver.com/docs/login/profile/profile.md
  async findNaverUserProfile({ accessToken }: FindNaverUserProfileData): Promise<FindNaverUserProfileResult> {
    try {
      const naverUserProfileResponse = await fromPromise(
        axios.get('https://openapi.naver.com/v1/nid/me', {
          headers: {
            'Content-Type': 'text/json;charset=utf-8',
            Authorization: `Bearer ${accessToken}`,
          },
        }),
        (error) => error as Error,
      );

      if (naverUserProfileResponse.isErr()) {
        const err = naverUserProfileResponse.error;

        if (axios.isAxiosError(err) && err.response) {
          const status = err.response.status;

          if (status === 401) {
            throw new UnauthorizedException({
              errorType: CoreErrorType.GET_NAVER_USER_PROFILE_AUTH_ERROR,
              errorData: (err.response.data as any)?.error,
            });
          }

          throw new InternalServerErrorException({
            errorType: CoreErrorType.GET_NAVER_USER_PROFILE_SERVER_ERROR,
            errorData: (err.response.data as any)?.error,
          });
        }

        throw new InternalServerErrorException(CoreErrorType.GET_NAVER_USER_PROFILE_SERVER_ERROR);
      }

      const naverUserProfileResponseData = plainToInstance(
        FindNaverUserProfileResponse,
        camelcaseKeys(naverUserProfileResponse.value.data, { deep: true }),
      );

      return plainToInstance(FindNaverUserProfileResult, {
        id: naverUserProfileResponseData.response.id,
        nickname: naverUserProfileResponseData.response.nickname,
        profileImage: naverUserProfileResponseData.response.profileImage,
        email: naverUserProfileResponseData.response.email,
        ...(naverUserProfileResponseData.response.age && {
          age: naverUserProfileResponseData.response.age,
        }),
        ...(naverUserProfileResponseData.response.gender && {
          gender: naverUserProfileResponseData.response.gender,
        }),
        ...(naverUserProfileResponseData.response.birthday && {
          birthday: naverUserProfileResponseData.response.birthday,
        }),
        ...(naverUserProfileResponseData.response.birthyear && {
          birthyear: naverUserProfileResponseData.response.birthyear,
        }),
      });
    } catch (err) {
      throw err;
    }
  }
}
