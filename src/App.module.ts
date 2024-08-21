import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';

import typeormConfig from '@src/database/config/TypeormConfig';

import { AuthModule } from '@src/core-module/Auth.module';
import { FileModule } from '@src/core-module/File.module';
import { HealthModule } from '@src/core-module/Health.module';
import { JwtModule } from '@src/core-module/Jwt.module';
import { PostModule } from '@src/core-module/Post.module';
import { UserModule } from '@src/core-module/User.module';

import { JwtMiddleware } from '@src/core-domain/jwt/Jwt.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test').required(),
        SERVER_PORT: Joi.string().required(),
        COOKIE_DOMAIN: Joi.string().required(),
        MAKEYONE_GALLERY_FRONT_URL: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        JWT_ACCESS_TOKEN_COOKIE_NAME: Joi.string().required(),
        JWT_REFRESH_TOKEN_COOKIE_NAME: Joi.string().required(),
        JWT_ACCESS_TOKEN_SECRET_KEY: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET_KEY: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRES_IN: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRES_IN: Joi.string().required(),
        AWS_S3_URL: Joi.string().required(),
        AWS_S3_ACCESS_KEY: Joi.string().required(),
        AWS_S3_SECRET_ACCESS_KEY: Joi.string().required(),
        AWS_S3_BUCKET_NAME: Joi.string().required(),
        AWS_S3_GALLERY_UPLOAD_FOLDER: Joi.string().required(),
        AWS_S3_REGION: Joi.string().required(),
        CDN_URL: Joi.string().required(),
      }),
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync(typeormConfig),
    HealthModule,
    JwtModule.forRoot({
      jwtAccessTokenCookieName: process.env.JWT_ACCESS_TOKEN_COOKIE_NAME,
      jwtRefreshTokenCookieName: process.env.JWT_REFRESH_TOKEN_COOKIE_NAME,
      accessTokenSecretKey: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
      accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
      refreshTokenSecretKey: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
      refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    }),
    AuthModule,
    FileModule.forRoot({
      awsS3Url: process.env.AWS_S3_URL,
      awsS3AccessKey: process.env.AWS_S3_ACCESS_KEY,
      awsS3SecretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
      awsS3BucketName: process.env.AWS_S3_BUCKET_NAME,
      awsS3GalleryUploadFolder: process.env.AWS_S3_GALLERY_UPLOAD_FOLDER,
      awsS3Region: process.env.AWS_S3_REGION,
      cdnUrl: process.env.CDN_URL,
    }),
    UserModule,
    PostModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
