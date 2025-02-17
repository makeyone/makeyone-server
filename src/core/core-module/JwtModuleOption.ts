export const JWT_CONFIG_OPTIONS = 'JWT_CONFIG_OPTIONS';

export class JwtModuleOptions {
  jwtAccessTokenCookieName: string;
  jwtRefreshTokenCookieName: string;
  accessTokenSecretKey: string;
  accessTokenExpiresIn: string;
  refreshTokenSecretKey: string;
  refreshTokenExpiresIn: string;
}
