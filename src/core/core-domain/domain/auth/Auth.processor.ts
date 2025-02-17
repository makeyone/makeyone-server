import { Injectable } from '@nestjs/common';

import { UserGenderUnion } from '@src/core/core-enum/user/UserGender.enum';
import { UserSocialProvider } from '@src/core/core-enum/user/UserSocialProvider.enum';

import { SocialSignInData } from '@src/core/core-domain/domain/auth/data/SocialSignInData';
import { SocialSignInResult } from '@src/core/core-domain/domain/auth/result/SocialSignInResult';
import { UserReader } from '@src/core/core-domain/domain/user/User.reader';

@Injectable()
export class AuthProcessor {
  constructor(private readonly userReader: UserReader) {}

  async socialSignIn({ socialProvider, accessToken }: SocialSignInData): Promise<SocialSignInResult> {
    let socialProviderId = '';
    let nickname = '';
    let gender: UserGenderUnion = 'Unknown';
    let profileImg = null;
    let age = null;
    let birthday = null;
    let birthyear = null;

    if (UserSocialProvider.NAVER.equals(socialProvider)) {
      const naverUserProfile = await this.userReader.findNaverUserProfile({ accessToken });
      socialProviderId = naverUserProfile.id;
      nickname = naverUserProfile.nickname;
      gender = naverUserProfile?.gender === 'M' ? 'Male' : naverUserProfile?.gender === 'F' ? 'Female' : 'Unknown';
      profileImg = naverUserProfile.profileImage || null;
      age = naverUserProfile.age || null;
      birthday = naverUserProfile.birthday || null;
      birthyear = naverUserProfile.birthyear || null;
    }

    if (UserSocialProvider.KAKAO.equals(socialProvider)) {
      const kakaoUserProfile = await this.userReader.findKakaoUserProfile({ accessToken });
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
      const googleUserProfile = await this.userReader.findGoogleUserProfile({ accessToken });
      socialProviderId = googleUserProfile.id;
      nickname = googleUserProfile.nickname;
      gender = 'Unknown';
      profileImg = googleUserProfile.profileImage;
      age = null;
      birthday = null;
      birthyear = null;
    }

    if (UserSocialProvider.DISCORD.equals(socialProvider)) {
      const discordUserProfile = await this.userReader.findDiscordUserProfile({ accessToken });
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
