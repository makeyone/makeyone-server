import { IsString } from 'class-validator';

import { CoreOutput } from '@src/libs/entity/domain/common/Core.dto';

export class ImagesUploadInput {
  files: Express.MulterS3.File[];

  @IsString()
  uploadPath: string;
}

export class ImagesUploadOutput extends CoreOutput {
  uploadedImages?: Array<{
    url: string;
    originalFileName: string;
    convertFileName: string;
  }>;
}
