import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
}).parsed;

export default async function awsS3GetObject(fileKey: string) {
  const s3 = new AWS.S3();
  const getParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileKey,
  };

  let response;
  try {
    response = await s3.getObject(getParams).promise();
  } catch (err) {
    response = null;
  }

  return response;
}
