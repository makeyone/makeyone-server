import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import * as dayjs from 'dayjs';
import { Response } from 'express';
import { Transactional } from 'typeorm-transactional';

import { UserSocialProviderUnion } from '@src/core-enum/user/UserSocialProvider.enum';

import { CoreErrorType } from '@src/core-api/support/error/CoreErrorType';

import { AuthProcessor } from '@src/core-domain/auth/Auth.processor';
import { SocialSignInData } from '@src/core-domain/auth/data/SocialSignInData';
import { SignInUserResult } from '@src/core-domain/auth/result/SignInUserResult';
import { JwtRemover } from '@src/core-domain/jwt/Jwt.remover';
import { JwtSetter } from '@src/core-domain/jwt/Jwt.setter';
import { JwtSign } from '@src/core-domain/jwt/Jwt.sign';
import { JwtVerify } from '@src/core-domain/jwt/Jwt.verify';
import { CreateUserData } from '@src/core-domain/user/data/CreateUserData';
import { CreateUserTokenData } from '@src/core-domain/user/data/CreateUserTokenData';
import { FindUserResult } from '@src/core-domain/user/result/FindUserResult';
import { UserCreator } from '@src/core-domain/user/User.creator';
import { UserReader } from '@src/core-domain/user/User.reader';
import { UserTokenCreator } from '@src/core-domain/user/UserToken.creator';
import { UserTokenReader } from '@src/core-domain/user/UserToken.reader';
import { UserTokenRemover } from '@src/core-domain/user/UserToken.remover';
import { UserTokenVerify } from '@src/core-domain/user/UserToken.verify';

@Injectable()
export class AuthService {
  constructor(
    private readonly authProcessor: AuthProcessor,
    private readonly userReader: UserReader,
    private readonly userCreator: UserCreator,
    private readonly userTokenReader: UserTokenReader,
    private readonly userTokenCreator: UserTokenCreator,
    private readonly userTokenVerify: UserTokenVerify,
    private readonly userTokenRemover: UserTokenRemover,
    private readonly jwtSign: JwtSign,
    private readonly jwtSetter: JwtSetter,
    private readonly jwtVerify: JwtVerify,
    private readonly jwtRemover: JwtRemover,
  ) {}

  @Transactional()
  async signIn(
    res: Response,
    email: string,
    socialProvider: UserSocialProviderUnion,
    socialSignIn: SocialSignInData,
  ): Promise<SignInUserResult> {
    const socialSignInUser = await this.authProcessor.socialSignIn(socialSignIn);
    let user = await this.userReader.findUserByEmail(email);

    if (user && user.socialProvider !== socialProvider) {
      throw new ForbiddenException({
        errorType: CoreErrorType.DIFFERENT_SOCIAL_PROVIDER,
        errorData: {
          registeredEmail: email,
          registeredSocialProvider: user.socialProvider,
        },
      });
    }

    if (!user) {
      const toCreateUser = plainToInstance(CreateUserData, {
        email: email,
        socialProvider: socialProvider,
        ...socialSignInUser,
      });
      const createdUser = await this.userCreator.createUser(toCreateUser);
      user = plainToInstance(FindUserResult, createdUser);
    }

    const signedAccessToken = this.jwtSign.userAccessToken(user.id);
    const signedRefreshToken = this.jwtSign.userRefreshToken(user.id);
    const signedRefreshTokenExp = dayjs()
      .add(parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN, 10), 'seconds')
      .toDate();

    const createUserTokenData = plainToInstance(CreateUserTokenData, {
      targetUserId: user.id,
      refreshToken: signedRefreshToken,
      refreshTokenExpireAt: signedRefreshTokenExp,
    });
    await this.userTokenCreator.createUserToken(createUserTokenData);

    this.jwtSetter.setRefreshTokenAndAccessToken(res, {
      accessToken: signedAccessToken,
      refreshToken: signedRefreshToken,
    });

    return {
      id: user.id,
      socialProvider: user.socialProvider,
      email: user.email,
      nickname: user.nickname,
      profileImg: user.profileImg,
      role: user.role,
      accessToken: signedAccessToken,
      refreshToken: signedRefreshToken,
    };
  }

  async signOut(res: Response): Promise<void> {
    this.jwtRemover.clearAccessTokenAndRefreshTokenCookies(res);
    const refreshToken = res.req.cookies[process.env.JWT_REFRESH_TOKEN_COOKIE_NAME];
    await this.userTokenRemover.removeUserTokenByRefreshToken(refreshToken);
  }

  async refreshToken(res: Response): Promise<string> {
    const refreshToken = res.req.cookies[process.env.JWT_REFRESH_TOKEN_COOKIE_NAME];
    const decodedRefreshToken = this.jwtVerify.userRefreshToken(refreshToken);

    await this.userTokenVerify.verifyRefreshToken(refreshToken);

    if (typeof decodedRefreshToken === 'object' && decodedRefreshToken.hasOwnProperty('id')) {
      const userId = decodedRefreshToken.id;
      const user = await this.userReader.findUserById(userId);

      if (!user) {
        throw new NotFoundException(CoreErrorType.USER_NOT_FOUND);
      }

      if (user.isActive === false) {
        throw new UnauthorizedException(CoreErrorType.NOT_ACTIVED_USER);
      }

      const newAccessToken = this.jwtSign.userAccessToken(userId);
      this.jwtSetter.setAccessToken(res, newAccessToken);

      return newAccessToken;
    }
  }
}
