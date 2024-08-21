import { NotFoundException } from '@nestjs/common';
import { IsString } from 'class-validator';

import { CoreErrorType } from '@src/core-api/support/error/CoreErrorType';

import { UploadImageListData } from '@src/core-domain/file/data/UploadImageListData';

export class UploadImageListReq {
  @IsString()
  uploadPath: string;

  toUploadImageList(fileList: Express.MulterS3.File[]): UploadImageListData {
    if (!fileList || fileList.length === 0) {
      throw new NotFoundException(CoreErrorType.FILE_NOT_FOUND);
    }

    return new UploadImageListData(fileList, this.uploadPath);
  }
}
