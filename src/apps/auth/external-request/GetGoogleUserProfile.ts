// 구글 프로필 조회 문서 : https://developers.google.com/identity/protocols/oauth2?hl=ko

import { InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import * as camelcaseKeys from 'camelcase-keys';
import { IsString } from 'class-validator';

class GetGoogleUserProfileInput {
  @IsString()
  accessToken: string;
}

class GetGoogleUserProfileResponse {
  sub: string;
  name: string;
  givenName: string;
  familyName: string;
  picture: string;
  email: string;
  emailVerified: boolean;
  locale: string;
}

class GetGoogleUserProfileOutput {
  id: string;
  nickname: string;
  profileImage: string;
  email: string;
}

export default async function getGoogleUserProfile({
  accessToken,
}: GetGoogleUserProfileInput): Promise<GetGoogleUserProfileOutput> {
  try {
    const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const resData: GetGoogleUserProfileResponse = camelcaseKeys(res.data, { deep: true });
    const output: GetGoogleUserProfileOutput = {
      id: resData.sub,
      nickname: resData.name,
      profileImage: resData.picture,
      email: resData.email,
    };

    return output;
  } catch (err) {
    console.error('------ GET_GOOGLE_USER_PROFILE_ERROR ------');
    console.error(err.response.data.error);
    console.error('------ ----------------------------- ------');

    const status = err.response.status as number;
    if (status === 401) {
      throw new UnauthorizedException('GET_GOOGLE_USER_PROFILE_AUTN_ERROR');
    }

    throw new InternalServerErrorException('GET_GOOGLE_USER_PROFILE_SERVER_ERROR');
  }
}
