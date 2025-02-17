import { NotFoundException } from '@nestjs/common';
import { IsString } from 'class-validator';

import { UploadImageListData } from '@src/core/core-domain/domain/file/data/UploadImageListData';
import { CoreErrorType } from '@src/core/core-domain/support/error/CoreErrorType';

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
