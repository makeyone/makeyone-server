import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
}).parsed;

export default async function awsS3CopyObject(fileKey: string, fileName: string, newDirectory: string) {
  const s3Copy = new AWS.S3();

  const copyParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    CopySource: encodeURI(`${process.env.AWS_S3_BUCKET_NAME}/${fileKey}`),
    Key: `${newDirectory}/${fileName}`,
  };

  await s3Copy.copyObject(copyParams).promise();
}
