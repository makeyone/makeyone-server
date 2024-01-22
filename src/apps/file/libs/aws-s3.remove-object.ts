import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
}).parsed;

export default async function awsS3RemoveObject(fileKey: string) {
  const s3Remove = new AWS.S3();

  const removeParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileKey,
  };
  await s3Remove.deleteObject(removeParams).promise();
}
