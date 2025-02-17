export class AwsS3PutObjectData {
  constructor(readonly Bucket: string, readonly Key: string, readonly Body: Buffer) {}
}
