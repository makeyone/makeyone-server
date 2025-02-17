export class FindKakaoUserProfileResponse {
  constructor(
    readonly id: number,
    readonly properties: {
      readonly nickname: string;
      readonly profileImage: string;
      readonly thumbnailImage: string;
    },
    readonly kakaoAccount: {
      readonly email: string;
      readonly profile: {
        readonly nickname: string;
        readonly thumbnailImageUrl: string;
        readonly profileImageUrl: string;
        readonly isDefaultImage: boolean;
      };
      readonly profileNicknameNeedsAgreement?: boolean;
      readonly profileImageNeedsAgreement?: boolean;
      readonly nameNeedsAgreement?: boolean;
      readonly hasEmail?: boolean;
      readonly emailNeedsAgreement?: boolean;
      readonly isEmailValid?: boolean;
      readonly isEmailVerified?: boolean;
      readonly hasAgeRange?: boolean;
      readonly ageRangeNeedsAgreement?: boolean;
      readonly agRange?: string;
      readonly hasBirthyear?: boolean;
      readonly birthyearNeedsAgreement?: boolean;
      readonly birthyear?: string;
      readonly hasBirthday?: boolean;
      readonly birthdayNeedsAgreement?: boolean;
      readonly birthday?: string;
      readonly has_gender?: boolean;
      readonly genderNeedsAgreement?: boolean;
      readonly gender?: 'male' | 'female';
    },
    readonly connectedAt?: string,
    readonly synchedAt?: string,
    readonly hasSignedUp?: boolean,
    readonly forPartner?: string,
  ) {}
}

export class FindKakaoUserProfileResult {
  constructor(
    readonly id: string,
    readonly nickname: string,
    readonly profileImage: string,
    readonly email: string,
    readonly age?: string,
    readonly gender?: 'male' | 'female',
    readonly birthday?: string,
    readonly birthyear?: string,
  ) {}
}
