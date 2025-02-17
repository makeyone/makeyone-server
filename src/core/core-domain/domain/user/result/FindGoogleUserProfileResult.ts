export class FindGoogleUserProfileResponse {
  constructor(
    readonly sub: string,
    readonly name: string,
    readonly givenName: string,
    readonly familyName: string,
    readonly picture: string,
    readonly email: string,
    readonly emailVerified: boolean,
    readonly locale: string,
  ) {}
}

export class FindGoogleUserProfileResult {
  constructor(readonly id: string, readonly nickname: string, readonly profileImage: string, readonly email: string) {}
}
