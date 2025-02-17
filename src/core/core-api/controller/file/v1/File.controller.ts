import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import imageUploadOptions from '@src/core/core-api/controller/file/v1/interceptor/ImageInterceptorOption';
import { UploadImageListReq } from '@src/core/core-api/controller/file/v1/request/UploadImageListReq.dto';
import { UploadImageListRes } from '@src/core/core-api/controller/file/v1/response/UploadImageListRes.dto';
import { RoleGuard } from '@src/core/core-api/decorator/auth/RoleGuard.decorator';
import { ApiResponse } from '@src/core/core-api/support/response/ApiResponse';

import { FileService } from '@src/core/core-domain/domain/file/File.service';

@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @RoleGuard(['ANY'])
  @Post('/v1/files/images')
  @UseInterceptors(FilesInterceptor('fileList', 10, imageUploadOptions))
  async uploadImageList(
    @UploadedFiles() fileList: Express.MulterS3.File[],
    @Body() request: UploadImageListReq,
  ): Promise<ApiResponse<UploadImageListRes[]>> {
    const result = await this.fileService.uploadImageList(request.toUploadImageList(fileList));
    return ApiResponse.successWithData(UploadImageListRes.of(result));
  }
}
