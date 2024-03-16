import { extname } from 'path';

import { ForbiddenException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';
import * as multerS3 from 'multer-s3';
import { v4 as uuidv4 } from 'uuid';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
}).parsed;

AWS.config.update({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  region: process.env.AWS_S3_REGION,
});

const maxFileSize = 30 * 1024 * 1024;

const multerS3StorageConfig = multerS3({
  s3: new AWS.S3(),
  bucket: process.env.AWS_S3_BUCKET_NAME,
  key: function (req: Express.Request, file: Express.MulterS3.File, cb: (error: any, key?: string) => void) {
    const uuid = uuidv4();
    const fileName = file.originalname.replace(/\s/g, '');
    const fileExt = extname(fileName);
    const uploadTime = new Date().getTime();

    cb(null, `${uuid}_${uploadTime}${fileExt}`);
  },
});

const fileFilterConfig =
  (filterType: RegExp) => (req: Express.Request, file: Express.MulterS3.File, cb: (error: any, key: boolean) => void) => {
    if (file.mimetype.match(filterType)) {
      return cb(null, true);
    }

    return cb(new ForbiddenException('UNSUPPORTED_FILE_FORMAT'), false);
  };

export const imageUploadOptions = {
  fileFilter: fileFilterConfig(/\/(jpg|jpeg|png|gif)$/),
  limits: {
    fileSize: maxFileSize,
    files: 1,
  },
  storage: multerS3StorageConfig,
};

export const imagesUploadMaxFiles = 100;
export const imagesUploadOptions = {
  fileFilter: fileFilterConfig(/\/(jpg|jpeg|png|gif)$/),
  limits: {
    fileSize: maxFileSize,
    files: imagesUploadMaxFiles,
  },
  storage: multerS3StorageConfig,
};
