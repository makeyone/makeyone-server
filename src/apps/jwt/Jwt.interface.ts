export interface JwtModuleOptions {
  accessTokenSecretKey: string;
  accessTokenExpiresIn: string;
  refreshTokenSecretKey: string;
  refreshTokenExpiresIn: string;
}

export interface JwtAccessTokenSignPayload {
  id: number;
}

export interface JwtRefreshTokenSignPayload {
  id: number;
}
