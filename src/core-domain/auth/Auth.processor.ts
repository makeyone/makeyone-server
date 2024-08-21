import { Injectable } from '@nestjs/common';
import getDiscordUserProfile from '@src/external-api/GetDiscordUserProfile';
import getGoogleUserProfile from '@src/external-api/GetGoogleUserProfile';
import getKakaoUserProfile from '@src/external-api/GetKakaoUserProfile';
import getNaverUserProfile from '@src/external-api/GetNaverUserProfile';

import { UserGenderUnion } from '@src/core-enum/user/UserGender.enum';
import { UserSocialProvider } from '@src/core-enum/user/UserSocialProvider.enum';

import { SocialSignInData } from '@src/core-domain/auth/data/SocialSignInData';
import { SocialSignInResult } from '@src/core-domain/auth/result/SocialSignInResult';

@Injectable()
export class AuthProcessor {
  constructor() {}

  async socialSignIn({ socialProvider, accessToken }: SocialSignInData): Promise<SocialSignInResult> {
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
      gender =
        kakaoUserProfile?.gender === 'male' ? 'Male' : kakaoUserProfile?.gender === 'female' ? 'Female' : 'Unknown';
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

    return {
      socialProviderId,
      nickname,
      gender,
      profileImg,
      age,
      birthday,
      birthyear,
    };
  }
}
