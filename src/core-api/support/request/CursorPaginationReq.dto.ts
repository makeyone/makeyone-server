import { IsNumber, IsOptional, IsString } from 'class-validator';

import { CursorPaginationData } from '@src/core-api/support/request/CursorPaginationData';

export class CursorPaginationQuery {
  @IsNumber()
  limit: number;

  @IsOptional()
  @IsString()
  nextCursor?: string;

  toCursor(): CursorPaginationData {
    return new CursorPaginationData(this.limit, this.nextCursor);
  }
}
