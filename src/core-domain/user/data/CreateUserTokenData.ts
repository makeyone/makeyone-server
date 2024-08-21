export class CreateUserTokenData {
  constructor(readonly targetUserId: number, readonly refreshToken: string, readonly refreshTokenExpireAt: string) {}
}
