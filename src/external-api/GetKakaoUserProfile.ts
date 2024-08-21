// 카카오 프로필 조회 문서 https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#req-user-info

import { InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import * as camelcaseKeys from 'camelcase-keys';
import { IsString } from 'class-validator';

import { CoreErrorType } from '@src/core-api/support/error/CoreErrorType';

class GetKakaoUserProfileInput {
  @IsString()
  accessToken: string;
}

class GetKakaoUserProfileResponse {
  id: number;
  properties: {
    nickname: string;
    profileImage: string;
    thumbnailImage: string;
  };
  kakaoAccount: {
    email: string;
    profile: {
      nickname: string;
      thumbnailImageUrl: string;
      profileImageUrl: string;
      isDefaultImage: boolean;
    };
    profileNicknameNeedsAgreement?: boolean;
    profileImageNeedsAgreement?: boolean;
    nameNeedsAgreement?: boolean;
    hasEmail?: boolean;
    emailNeedsAgreement?: boolean;
    isEmailValid?: boolean;
    isEmailVerified?: boolean;
    hasAgeRange?: boolean;
    ageRangeNeedsAgreement?: boolean;
    agRange?: string;
    hasBirthyear?: boolean;
    birthyearNeedsAgreement?: boolean;
    birthyear?: string;
    hasBirthday?: boolean;
    birthdayNeedsAgreement?: boolean;
    birthday?: string;
    has_gender?: boolean;
    genderNeedsAgreement?: boolean;
    gender?: 'male' | 'female';
  };
  connectedAt?: string;
  synchedAt?: string;
  hasSignedUp?: boolean;
  forPartner?: string;
}

class GetKakaoUserProfileOutput {
  id: string;
  nickname: string;
  profileImage: string;
  email: string;
  age?: string;
  gender?: 'male' | 'female';
  birthday?: string;
  birthyear?: string;
}

export default async function getKakaoUserProfile({
  accessToken,
}: GetKakaoUserProfileInput): Promise<GetKakaoUserProfileOutput> {
  try {
    const res = await axios.get('https://kapi.kakao.com/v2/user/me?secure_resource=true', {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const resData: GetKakaoUserProfileResponse = camelcaseKeys(res.data, { deep: true });
    const output: GetKakaoUserProfileOutput = {
      id: resData.id.toString(),
      nickname: resData.kakaoAccount.profile.nickname,
      profileImage: resData.kakaoAccount.profile.profileImageUrl,
      email: resData.kakaoAccount.email,
      ...(resData.kakaoAccount.agRange && { age: resData.kakaoAccount.agRange }),
      ...(resData.kakaoAccount.gender && { gender: resData.kakaoAccount.gender }),
      ...(resData.kakaoAccount.birthday && { birthday: resData.kakaoAccount.birthday }),
      ...(resData.kakaoAccount.birthyear && { birthyear: resData.kakaoAccount.birthyear }),
    };

    return output;
  } catch (err) {
    const status = err.response.status as number;
    if (status === 401) {
      throw new UnauthorizedException({
        errorType: CoreErrorType.GET_KAKAO_USER_PROFILE_AUTH_ERROR,
        errorData: err.response.data,
      });
    }

    throw new InternalServerErrorException({
      errorType: CoreErrorType.GET_KAKAO_USER_PROFILE_SERVER_ERROR,
      errorData: err.response.data,
    });
  }
}
