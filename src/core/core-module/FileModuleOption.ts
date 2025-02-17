export const FILE_CONFIG_OPTIONS = 'FILE_CONFIG_OPTIONS';

export interface FileModuleOptions {
  awsS3Url: string;
  awsS3AccessKey: string;
  awsS3SecretAccessKey: string;
  awsS3BucketName: string;
  awsS3GalleryUploadFolder: string;
  awsS3Region: string;
  cdnUrl: string;
}
