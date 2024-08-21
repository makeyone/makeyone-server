import { extname } from 'path';

import { ForbiddenException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as AWS from 'aws-sdk';
import * as dayjs from 'dayjs';
import * as dotenv from 'dotenv';
import * as multerS3 from 'multer-s3';
import { v4 as uuidv4 } from 'uuid';

import { CoreErrorType } from '@src/core-api/support/error/CoreErrorType';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
}).parsed;

AWS.config.update({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  region: process.env.AWS_S3_REGION,
});

const multerS3StorageConfig = multerS3({
  s3: new AWS.S3(),
  bucket: process.env.AWS_S3_BUCKET_NAME,
  key: function (_req: Express.Request, file: Express.MulterS3.File, cb: (error: any, key: string) => void) {
    const uuid = uuidv4();
    const fileName = file.originalname.replace(/\s/g, '');
    const fileExt = extname(fileName);
    const uploadTime = dayjs().valueOf();

    cb(null, `${uuid}_${uploadTime}${fileExt}`);
  },
});

const fileFilterConfig =
  (filterType: RegExp) =>
  (_req: Express.Request, file: Express.MulterS3.File, cb: (error: any, key: boolean) => void) => {
    if (file.mimetype.match(filterType)) {
      return cb(null, true);
    }

    return cb(new ForbiddenException(CoreErrorType.UNSUPPORTED_FILE_FORMAT), false);
  };

const imageUploadOptions: MulterOptions = {
  fileFilter: fileFilterConfig(/\/(jpg|jpeg|png|gif)$/),
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 10,
  },
  storage: multerS3StorageConfig,
};

export default imageUploadOptions;
