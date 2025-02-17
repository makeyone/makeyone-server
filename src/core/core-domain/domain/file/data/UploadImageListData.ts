export class UploadImageListData {
  constructor(readonly fileList: Express.MulterS3.File[], readonly uploadPath: string) {}
}
