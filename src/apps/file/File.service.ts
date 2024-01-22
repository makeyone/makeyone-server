import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { ImagesUploadInput, ImagesUploadOutput } from '@src/apps/file/dtos/ImagesUpload.dto';
import { ImageUploadInput, ImageUploadOutput } from '@src/apps/file/dtos/ImageUpload.dto';
import { FILE_CONFIG_OPTIONS } from '@src/apps/file/File.constants';
import { FileModuleOptions } from '@src/apps/file/File.interface';
import awsS3CopyObject from '@src/apps/file/libs/aws-s3.copy-object';
import awsS3RemoveObject from '@src/apps/file/libs/aws-s3.remove-object';
import { compressImage } from '@src/apps/file/libs/compress-image';

@Injectable()
export class FileService {
  constructor(@Inject(FILE_CONFIG_OPTIONS) private readonly options: FileModuleOptions) {}

  async imageUpload({ file, uploadPath }: ImageUploadInput): Promise<ImageUploadOutput> {
    if (!file) {
      throw new NotFoundException('FILE_NOT_FOUND');
    }

    const moveDirectoryLocation = `${this.options.awsS3GalleryUploadFolder}/${uploadPath}`;

    const fileKey = file.key;
    const fileName = fileKey.split('/').reverse()[0];
    const originalFileName = file.originalname;

    const compressedKey = await compressImage(fileKey);
    await awsS3CopyObject(compressedKey, fileName, moveDirectoryLocation);
    await awsS3RemoveObject(compressedKey);

    return {
      ok: true,
      uploadedImage: {
        url: `${this.options.awsCloudFrontResUrl}/${moveDirectoryLocation}/${fileName}`,
        originalFileName,
        convertFileName: fileName,
      },
    };
  }

  async imagesUpload({ files, uploadPath }: ImagesUploadInput): Promise<ImagesUploadOutput> {
    if (!files || files.length === 0) {
      throw new NotFoundException('FILE_NOT_FOUND');
    }

    const moveDirectoryLocation = `${this.options.awsS3GalleryUploadFolder}/${uploadPath}`;
    const images = [];
    for (const file of files) {
      const fileKey = file.key;
      const fileName = fileKey.split('/').reverse()[0];
      const originalFileName = file.originalname;

      const compressedKey = await compressImage(fileKey);
      await awsS3CopyObject(compressedKey, fileName, moveDirectoryLocation);
      await awsS3RemoveObject(compressedKey);

      images.push({
        url: `${this.options.awsCloudFrontResUrl}/${moveDirectoryLocation}/${fileName}`,
        originalFileName,
        convertFileName: fileName,
      });
    }

    return {
      ok: true,
      uploadedImages: images,
    };
  }
}
