// 네이버 프로필 조회 문서 https://developers.naver.com/docs/login/profile/profile.md

import { InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import * as camelcaseKeys from 'camelcase-keys';
import { IsString } from 'class-validator';

import { CoreErrorType } from '@src/core-api/support/error/CoreErrorType';

class GetNaverUserProfileInput {
  @IsString()
  accessToken: string;
}

class GetNaverUserProfileOutput {
  id: string;
  nickname: string;
  profileImage: string;
  email: string;
  age?: string;
  gender?: 'F' | 'M' | 'U';
  birthday?: string;
  birthyear?: string;
}

export default async function getNaverUserProfile({
  accessToken,
}: GetNaverUserProfileInput): Promise<GetNaverUserProfileOutput> {
  try {
    const res = await axios.get('https://openapi.naver.com/v1/nid/me', {
      headers: {
        'Content-Type': 'text/json;charset=utf-8',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return camelcaseKeys(res.data.response);
  } catch (err) {
    const status = err.response.status as number;
    if (status === 401) {
      throw new UnauthorizedException({
        errorType: CoreErrorType.GET_NAVER_USER_PROFILE_AUTH_ERROR,
        errorData: err.response.data,
      });
    }

    throw new InternalServerErrorException({
      errorType: CoreErrorType.GET_NAVER_USER_PROFILE_SERVER_ERROR,
      errorData: err.response.data,
    });
  }
}
