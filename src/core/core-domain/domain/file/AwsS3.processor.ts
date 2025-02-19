import { Inject, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { GetObjectOutput } from 'aws-sdk/clients/s3';
import { PromiseResult } from 'aws-sdk/lib/request';
import * as sharp from 'sharp';

import { FILE_CONFIG_OPTIONS, FileModuleOptions } from '@src/core/core-module/FileModuleOption';

import { AwsS3CopyObjectData } from '@src/core/core-domain/domain/file/data/AwsS3CopyObjectData';
import { AwsS3PutObjectData } from '@src/core/core-domain/domain/file/data/AwsS3PutObjectData';

@Injectable()
export class AwsS3Processor {
  constructor(@Inject(FILE_CONFIG_OPTIONS) private readonly options: FileModuleOptions) {}

  async compressImage(fileKey: string): Promise<string> {
    const compressedKey = `compressed_${fileKey.replace(/\.[^/.]+$/, '')}.webp`;

    const imageData = await this.awsS3GetObject(fileKey);
    const imageBuffer = await sharp(imageData.Body as Buffer, { failOn: 'truncated' })
      .webp({
        quality: 80,
      })
      .withMetadata()
      .rotate()
      .toBuffer();

    await this.awsS3PutObject({
      Bucket: this.options.awsS3BucketName,
      Key: compressedKey,
      Body: imageBuffer,
      ContentType: 'image/webp',
    });
    await this.awsS3RemoveObject(fileKey);

    return compressedKey;
  }

  async awsS3GetObject(fileKey: string): Promise<PromiseResult<GetObjectOutput, AWS.AWSError>> {
    const s3 = new AWS.S3();
    const getParams = {
      Bucket: this.options.awsS3BucketName,
      Key: fileKey,
    };

    const response = await s3.getObject(getParams).promise();
    return response;
  }

  async awsS3PutObject(resizedConfig: AwsS3PutObjectData): Promise<void> {
    const s3 = new AWS.S3();
    await s3.putObject(resizedConfig).promise();
  }

  async awsS3CopyObject({ copyFileKey, newFileKey, path }: AwsS3CopyObjectData): Promise<void> {
    const s3 = new AWS.S3();
    await s3
      .copyObject({
        Bucket: this.options.awsS3BucketName,
        CopySource: encodeURI(`${this.options.awsS3BucketName}/${copyFileKey}`),
        Key: `${path}/${newFileKey}`,
        ContentType: 'image/webp',
      })
      .promise();
  }

  async awsS3RemoveObject(fileKey: string): Promise<void> {
    const s3 = new AWS.S3();
    await s3
      .deleteObject({
        Bucket: this.options.awsS3BucketName,
        Key: fileKey,
      })
      .promise();
  }
}
