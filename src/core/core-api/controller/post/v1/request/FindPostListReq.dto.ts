import { IsNumber, IsOptional, IsString } from 'class-validator';

import { FindPostListData } from '@src/core/core-domain/domain/post/data/FindPostListData';

export class FindPostListQuery {
  @IsNumber()
  limit: number;

  @IsOptional()
  @IsString()
  nextCursor?: string;

  toFindPostListData(): FindPostListData {
    return new FindPostListData(this.limit, this.nextCursor);
  }
}
