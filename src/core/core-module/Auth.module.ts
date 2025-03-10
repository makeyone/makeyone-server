import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { FILE_CONFIG_OPTIONS } from '@src/core/core-module/FileModuleOption';

import { AuthController } from '@src/core/core-api/controller/auth/v1/Auth.controller';
import { AuthGuard } from '@src/core/core-api/guard/auth/Auth.guard';

import { AuthProcessor } from '@src/core/core-domain/domain/auth/Auth.processor';
import { AuthService } from '@src/core/core-domain/domain/auth/Auth.service';
import { AwsS3Processor } from '@src/core/core-domain/domain/file/AwsS3.processor';
import { FileGenerator } from '@src/core/core-domain/domain/file/File.generator';
import { JwtRemover } from '@src/core/core-domain/domain/jwt/Jwt.remover';
import { JwtService } from '@src/core/core-domain/domain/jwt/Jwt.service';
import { JwtSetter } from '@src/core/core-domain/domain/jwt/Jwt.setter';
import { JwtSign } from '@src/core/core-domain/domain/jwt/Jwt.sign';
import { JwtVerify } from '@src/core/core-domain/domain/jwt/Jwt.verify';
import { UserCreator } from '@src/core/core-domain/domain/user/User.creator';
import { UserEditor } from '@src/core/core-domain/domain/user/User.editor';
import { UserReader } from '@src/core/core-domain/domain/user/User.reader';
import { UserRemover } from '@src/core/core-domain/domain/user/User.remover';
import { UserService } from '@src/core/core-domain/domain/user/User.service';
import { UserValidator } from '@src/core/core-domain/domain/user/User.validator';
import { UserTokenCreator } from '@src/core/core-domain/domain/user/UserToken.creator';
import { UserTokenReader } from '@src/core/core-domain/domain/user/UserToken.reader';
import { UserTokenRemover } from '@src/core/core-domain/domain/user/UserToken.remover';
import { UserTokenService } from '@src/core/core-domain/domain/user/UserToken.service';
import { UserTokenVerify } from '@src/core/core-domain/domain/user/UserToken.verify';

import { UserTokenCron } from '@src/core/core-cron/user/UserToken.cron';

import { UserRepository } from '@src/database/entity/User/User.repository';
import { UserTokenRepository } from '@src/database/entity/User/UserToken.repository';
import { TypeormEntityModule } from '@src/database/TypeormEntity.module';

@Module({
  imports: [TypeormEntityModule.forCustomRepository([UserRepository, UserTokenRepository])],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthProcessor,
    JwtService,
    UserService,
    UserTokenService,
    UserTokenCron,
    UserTokenReader,
    UserReader,
    UserCreator,
    UserValidator,
    UserEditor,
    UserRemover,
    UserTokenCreator,
    UserTokenVerify,
    UserTokenRemover,
    JwtSign,
    JwtSetter,
    JwtVerify,
    JwtRemover,
    AwsS3Processor,
    FileGenerator,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: FILE_CONFIG_OPTIONS,
      useFactory: (configService: ConfigService) => ({
        awsS3Url: configService.get<string>('AWS_S3_URL'),
        awsS3AccessKey: configService.get<string>('AWS_S3_ACCESS_KEY'),
        awsS3SecretAccessKey: configService.get<string>('AWS_S3_SECRET_ACCESS_KEY'),
        awsS3BucketName: configService.get<string>('AWS_S3_BUCKET_NAME'),
        awsS3GalleryUploadFolder: configService.get<string>('AWS_S3_GALLERY_UPLOAD_FOLDER'),
        awsS3Region: configService.get<string>('AWS_S3_REGION'),
        cdnUrl: configService.get<string>('CDN_URL'),
      }),
      inject: [ConfigService],
    },
  ],
})
export class AuthModule {}
