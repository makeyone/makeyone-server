import { DynamicModule, Module } from '@nestjs/common';

import { FILE_CONFIG_OPTIONS, FileModuleOptions } from '@src/core-module/FileModuleOption';

import { FileController } from '@src/core-api/file/controller/v1/File.controller';

import { AwsS3Processor } from '@src/core-domain/file/AwsS3.processor';
import { FileProcessor } from '@src/core-domain/file/File.processor';
import { FileService } from '@src/core-domain/file/File.service';

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
