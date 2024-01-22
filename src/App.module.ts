import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';

import { realTypeormConfig } from '@src/libs/entity/config/real.config';

import { AuthModule } from '@src/apps/auth/Auth.module';
import { FileModule } from '@src/apps/file/File.module';
import { JwtMiddleware } from '@src/apps/jwt/Jwt.middleware';
import { JwtModule } from '@src/apps/jwt/Jwt.module';
import { UserModule } from '@src/apps/user/User.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test').required(),
        SERVER_PORT: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
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
        AWS_CLOUD_FRONT_RES_URL: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot(realTypeormConfig),
    ScheduleModule.forRoot(),
    FileModule.forRoot({
      awsS3Url: process.env.AWS_S3_URL,
      awsS3AccessKey: process.env.AWS_S3_ACCESS_KEY,
      awsS3SecretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
      awsS3BucketName: process.env.AWS_S3_BUCKET_NAME,
      awsS3GalleryUploadFolder: process.env.AWS_S3_GALLERY_UPLOAD_FOLDER,
      awsS3Region: process.env.AWS_S3_REGION,
      awsCloudFrontResUrl: process.env.AWS_CLOUD_FRONT_RES_URL,
    }),
    JwtModule.forRoot({
      accessTokenSecretKey: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
      accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
      refreshTokenSecretKey: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
      refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    }),
    AuthModule,
    UserModule,
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
