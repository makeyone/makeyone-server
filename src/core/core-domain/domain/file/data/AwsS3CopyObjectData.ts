export class AwsS3CopyObjectData {
  constructor(readonly copyFileKey: string, readonly newFileKey: string, readonly path: string) {}
}
