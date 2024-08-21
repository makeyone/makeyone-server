import { Inject, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { GetObjectOutput } from 'aws-sdk/clients/s3';
import { PromiseResult } from 'aws-sdk/lib/request';

import { FILE_CONFIG_OPTIONS, FileModuleOptions } from '@src/core-module/FileModuleOption';

import { AwsS3CopyObjectData } from '@src/core-domain/file/data/AwsS3CopyObjectData';
import { AwsS3PutObjectData } from '@src/core-domain/file/data/AwsS3PutObjectData';

@Injectable()
export class AwsS3Processor {
  constructor(@Inject(FILE_CONFIG_OPTIONS) private readonly options: FileModuleOptions) {}

  async getObject(fileKey: string): Promise<PromiseResult<GetObjectOutput, AWS.AWSError>> {
    const s3 = new AWS.S3();
    const getParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileKey,
    };

    const response = await s3.getObject(getParams).promise();
    return response;
  }

  async putObject(resizedConfig: AwsS3PutObjectData): Promise<void> {
    const s3 = new AWS.S3();
    await s3.putObject(resizedConfig).promise();
  }

  async copyObject({ fileKey, fileName, directory }: AwsS3CopyObjectData): Promise<void> {
    const s3 = new AWS.S3();
    await s3
      .copyObject({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        CopySource: encodeURI(`${process.env.AWS_S3_BUCKET_NAME}/${fileKey}`),
        Key: `${directory}/${fileName}`,
      })
      .promise();
  }

  async removeObject(fileKey: string): Promise<void> {
    const s3 = new AWS.S3();
    await s3
      .deleteObject({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileKey,
      })
      .promise();
  }
}
