export class FindDiscordUserProfileResponse {
  constructor(
    readonly id: string,
    readonly email: string,
    readonly username: string,
    readonly avatar: string,
    readonly globalName: string,
    readonly discriminator: string,
    readonly publicFlags?: number,
    readonly premiumType?: number,
    readonly flags?: number,
    readonly avatarDecorationData?: {
      readonly asset: string;
      readonly skuId: string;
    },
    readonly accentColor?: number,
    readonly bot?: boolean,
    readonly system?: boolean,
    readonly banner?: string,
    readonly bannerColor?: string,
    readonly mfaEnabled?: boolean,
    readonly locale?: string,
    readonly verified?: boolean,
  ) {}
}

export class FindDiscordUserProfileResult {
  constructor(readonly id: string, readonly nickname: string, readonly profileImage: string, readonly email: string) {}
}
