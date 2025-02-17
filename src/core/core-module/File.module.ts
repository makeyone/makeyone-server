import { DynamicModule, Module } from '@nestjs/common';

import { FILE_CONFIG_OPTIONS, FileModuleOptions } from '@src/core/core-module/FileModuleOption';

import { FileController } from '@src/core/core-api/controller/file/v1/File.controller';

import { AwsS3Processor } from '@src/core/core-domain/domain/file/AwsS3.processor';
import { FileProcessor } from '@src/core/core-domain/domain/file/File.processor';
import { FileService } from '@src/core/core-domain/domain/file/File.service';

@Module({
  controllers: [FileController],
})
export class FileModule {
  static forRoot(options: FileModuleOptions): DynamicModule {
    return {
      module: FileModule,
      providers: [
        {
          provide: FILE_CONFIG_OPTIONS,
          useValue: options,
        },
        FileService,
        FileProcessor,
        AwsS3Processor,
      ],
    };
  }
}
