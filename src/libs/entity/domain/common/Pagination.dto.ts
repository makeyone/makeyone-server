import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Cursor } from 'typeorm-cursor-pagination';

import { CoreOutput } from '@src/libs/entity/domain/common/Core.dto';

export class CursorPaginationQuery {
  @IsNumber()
  limit: number;

  @IsOptional()
  @IsString()
  nextCursor?: string;
}

export class CursorPaginationOutput extends CoreOutput {
  cursor?: Cursor | null;
  totalResults?: number;
}

export class OffsetPaginationQuery {
  @IsNumber()
  page: number;

  @IsNumber()
  limit: number;
}

export class OffsetPaginationOutput extends CoreOutput {
  totalPages?: number;
  totalResults?: number;
}
