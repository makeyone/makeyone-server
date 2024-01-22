import { DynamicModule, Module } from '@nestjs/common';

import { FILE_CONFIG_OPTIONS } from '@src/apps/file/File.constants';
import { FileController } from '@src/apps/file/File.controller';
import { FileModuleOptions } from '@src/apps/file/File.interface';
import { FileService } from '@src/apps/file/File.service';

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
      ],
    };
  }
}
