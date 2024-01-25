import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';
import * as sharp from 'sharp';

import awsS3GetObject from '@src/apps/file/libs/aws-s3.get-object';
import awsS3RemoveObject from '@src/apps/file/libs/aws-s3.remove-object';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
}).parsed;

export const compressImage = async (fileKey: string) => {
  try {
    const compressedKey = `compressed_${fileKey}`;
    const s3 = new AWS.S3();

    const imageData = await awsS3GetObject(fileKey);
    const imageBuffer = await sharp(imageData.Body, { failOn: 'truncated' })
      .jpeg({
        quality: 80,
      })
      .withMetadata()
      .rotate()
      .toBuffer();

    const resizedConfig = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: compressedKey,
      Body: imageBuffer,
    };

    await s3.putObject(resizedConfig).promise();
    await awsS3RemoveObject(fileKey);

    return compressedKey;
  } catch (error) {
    console.log('Get image by key from aws: ', error);
  }
};
