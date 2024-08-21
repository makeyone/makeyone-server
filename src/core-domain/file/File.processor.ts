import { Inject, Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

import { FILE_CONFIG_OPTIONS, FileModuleOptions } from '@src/core-module/FileModuleOption';

import { AwsS3Processor } from '@src/core-domain/file/AwsS3.processor';

@Injectable()
export class FileProcessor {
  constructor(
    @Inject(FILE_CONFIG_OPTIONS) private readonly options: FileModuleOptions,
    private readonly awsS3Processor: AwsS3Processor,
  ) {}

  async compressImage(fileKey: string): Promise<string> {
    const compressedKey = `compressed_${fileKey}`;

    const imageData = await this.awsS3Processor.getObject(fileKey);
    const imageBuffer = await sharp(imageData.Body as any, { failOn: 'truncated' })
      .jpeg({
        quality: 50,
      })
      .withMetadata()
      .rotate()
      .toBuffer();

    await this.awsS3Processor.putObject({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: compressedKey,
      Body: imageBuffer,
    });
    await this.awsS3Processor.removeObject(fileKey);

    return compressedKey;
  }
}
