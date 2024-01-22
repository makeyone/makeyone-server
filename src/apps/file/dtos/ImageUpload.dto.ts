import { IsString } from 'class-validator';

import { CoreOutput } from '@src/libs/entity/domain/common/Core.dto';

export class ImageUploadInput {
  file: Express.MulterS3.File;

  @IsString()
  uploadPath: string;
}

export class ImageUploadOutput extends CoreOutput {
  uploadedImage?: {
    url: string;
    originalFileName: string;
    convertFileName: string;
  };
}
