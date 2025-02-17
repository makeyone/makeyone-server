export class FindNaverUserProfileResponse {
  constructor(
    readonly resultcode: string,
    readonly message: string,
    readonly response: {
      readonly id: string;
      readonly email: string;
      readonly nickname: string;
      readonly profileImage: string;
      readonly age?: string;
      readonly gender?: 'F' | 'M' | 'U';
      readonly birthday?: string;
      readonly birthyear?: string;
    },
  ) {}
}

export class FindNaverUserProfileResult {
  constructor(
    readonly id: string,
    readonly nickname: string,
    readonly profileImage: string,
    readonly email: string,
    readonly age?: string,
    readonly gender?: 'F' | 'M' | 'U',
    readonly birthday?: string,
    readonly birthyear?: string,
  ) {}
}
