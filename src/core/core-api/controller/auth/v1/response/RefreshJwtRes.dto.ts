export class RefreshJwtResDto {
  constructor(readonly accessToken: string) {}

  static of(accessToken: string): RefreshJwtResDto {
    return new RefreshJwtResDto(accessToken);
  }
}
