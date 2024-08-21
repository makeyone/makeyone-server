import { Inject, Injectable } from '@nestjs/common';

import { FILE_CONFIG_OPTIONS, FileModuleOptions } from '@src/core-module/FileModuleOption';

import { AwsS3Processor } from '@src/core-domain/file/AwsS3.processor';
import { UploadImageListData } from '@src/core-domain/file/data/UploadImageListData';
import { FileProcessor } from '@src/core-domain/file/File.processor';
import { UploadImageResult } from '@src/core-domain/file/result/UploadImageResult';

@Injectable()
export class FileService {
  constructor(
    @Inject(FILE_CONFIG_OPTIONS) private readonly options: FileModuleOptions,
    private readonly fileProcessor: FileProcessor,
    private readonly awsS3Processor: AwsS3Processor,
  ) {}

  async uploadImageList(uploadData: UploadImageListData): Promise<UploadImageResult[]> {
    const { fileList, uploadPath } = uploadData;

    const moveLocation = `${this.options.awsS3GalleryUploadFolder}/${uploadPath}`;

    const images = [];
    for (const file of fileList) {
      const fileKey = file.key;
      const fileName = fileKey.split('/').reverse()[0];
      const originalFileName = file.originalname;

      const compressedImageKey = await this.fileProcessor.compressImage(fileKey);
      await this.awsS3Processor.copyObject({
        fileKey: compressedImageKey,
        fileName,
        directory: moveLocation,
      });
      await this.awsS3Processor.removeObject(compressedImageKey);

      images.push({
        url: `${this.options.cdnUrl}/${moveLocation}/${fileName}`,
        originalFileName,
        convertFileName: fileName,
      });
    }

    return images;
  }
}
