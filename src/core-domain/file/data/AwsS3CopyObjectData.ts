export class AwsS3CopyObjectData {
  constructor(readonly fileKey: string, readonly fileName: string, readonly directory: string) {}
}
