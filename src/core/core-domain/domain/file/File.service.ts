import { Inject, Injectable } from '@nestjs/common';

import { FILE_CONFIG_OPTIONS, FileModuleOptions } from '@src/core/core-module/FileModuleOption';

import { UploadImageListData } from '@src/core/core-domain/domain/file/data/UploadImageListData';
import { FileProcessor } from '@src/core/core-domain/domain/file/File.processor';
import { UploadImageResult } from '@src/core/core-domain/domain/file/result/UploadImageResult';

@Injectable()
export class FileService {
  constructor(
    @Inject(FILE_CONFIG_OPTIONS) private readonly options: FileModuleOptions,
    private readonly fileProcessor: FileProcessor,
  ) {}

  async uploadImageList(uploadData: UploadImageListData): Promise<UploadImageResult[]> {
    const { fileList, uploadPath } = uploadData;

    const moveLocation = `${this.options.awsS3GalleryUploadFolder}/${uploadPath}`;

    const images: UploadImageResult[] = [];
    for (const file of fileList) {
      const fileKey = file.key;
      const originalFileName = file.originalname;

      const compressedImageKey = await this.fileProcessor.compressImage(fileKey);
      const removeCompressedName = compressedImageKey.replace('compressed_', '');

      await this.fileProcessor.awsS3CopyObject({
        copyFileKey: compressedImageKey,
        newFileKey: removeCompressedName,
        path: moveLocation,
      });
      await this.fileProcessor.awsS3RemoveObject(compressedImageKey);

      images.push({
        url: `${this.options.cdnUrl}/${moveLocation}/${removeCompressedName}`,
        originalFileName,
        convertFileName: removeCompressedName,
      });
    }

    return images;
  }
}
