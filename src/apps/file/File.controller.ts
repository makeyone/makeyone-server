import { Body, Controller, Inject, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

import { ImagesUploadInput, ImagesUploadOutput } from '@src/apps/file/dtos/ImagesUpload.dto';
import { ImageUploadInput, ImageUploadOutput } from '@src/apps/file/dtos/ImageUpload.dto';
import { FILE_CONFIG_OPTIONS } from '@src/apps/file/File.constants';
import { FileModuleOptions } from '@src/apps/file/File.interface';
import { FileService } from '@src/apps/file/File.service';
import { imagesUploadMaxFiles, imagesUploadOptions, imageUploadOptions } from '@src/apps/file/FileUploadOptions';

@Controller('v1/files')
export class FileController {
  constructor(
    @Inject(FILE_CONFIG_OPTIONS) private readonly options: FileModuleOptions,
    private readonly fileService: FileService,
  ) {}

  @Post('upload/image')
  @UseInterceptors(FileInterceptor('image', imageUploadOptions))
  async imageUpload(
    @UploadedFile() file: ImageUploadInput['file'],
    @Body('uploadPath') uploadPath: ImageUploadInput['uploadPath'],
  ): Promise<ImageUploadOutput> {
    return await this.fileService.imageUpload({ file, uploadPath });
  }

  @Post('upload/images')
  @UseInterceptors(FilesInterceptor('images', imagesUploadMaxFiles, imagesUploadOptions))
  async imageUploads(
    @UploadedFiles() files: ImagesUploadInput['files'],
    @Body('uploadPath') uploadPath: ImagesUploadInput['uploadPath'],
  ): Promise<ImagesUploadOutput> {
    return await this.fileService.imagesUpload({ files, uploadPath });
  }
}
