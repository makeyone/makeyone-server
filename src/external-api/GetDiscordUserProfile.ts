// 디스코드 프로필 조회 문서 : https://discord.com/developers/docs/resources/user#user-object

import { InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import * as camelcaseKeys from 'camelcase-keys';
import { IsString } from 'class-validator';

import { CoreErrorType } from '@src/core-api/support/error/CoreErrorType';

class GetDiscordUserProfileInput {
  @IsString()
  accessToken: string;
}

class GetDiscordUserProfileResponse {
  id: string;
  email: string;
  username: string;
  avatar: string;
  globalName: string;
  discriminator: string;
  publicFlags?: number;
  premiumType?: number;
  flags?: number;
  avatarDecorationData?: {
    asset: string;
    skuId: string;
  };
  accentColor?: number;
  bot?: boolean;
  system?: boolean;
  banner?: string;
  bannerColor?: string;
  mfaEnabled?: boolean;
  locale?: string;
  verified?: boolean;
}

class GetDiscordUserProfileOutput {
  id: string;
  nickname: string;
  profileImage: string;
  email: string;
}

export default async function getDiscordUserProfile({
  accessToken,
}: GetDiscordUserProfileInput): Promise<GetDiscordUserProfileOutput> {
  try {
    const res = await axios.get('https://discordapp.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const resData: GetDiscordUserProfileResponse = camelcaseKeys(res.data, { deep: true });
    const output: GetDiscordUserProfileOutput = {
      id: resData.id,
      nickname: resData.globalName,
      profileImage: `https://cdn.discordapp.com/avatars/${resData.id}/${resData.avatar}`,
      email: resData.email,
    };

    return output;
  } catch (err) {
    const status = err.response.status as number;
    if (status === 401) {
      throw new UnauthorizedException({
        errorType: CoreErrorType.GET_DISCORD_USER_PROFILE_AUTH_ERROR,
        errorData: err.response.data.error,
      });
    }

    throw new InternalServerErrorException({
      errorType: CoreErrorType.GET_DISCORD_USER_PROFILE_SERVER_ERROR,
      errorData: err.response.data.error,
    });
  }
}
