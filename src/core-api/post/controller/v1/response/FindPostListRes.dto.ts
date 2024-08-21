import { Cursor } from 'typeorm-cursor-pagination';

import { CursorPaginationRes } from '@src/core-api/support/response/CursorPaginationRes.dto';

import { FindPostImageResult } from '@src/core-domain/post/result/FindPostImageResult';
import { FindPostListResult } from '@src/core-domain/post/result/FindPostListResult';
import { FindUserResult } from '@src/core-domain/user/result/FindUserResult';

export class FindPostListRes extends CursorPaginationRes {
  constructor(
    readonly totalResults: number,
    readonly cursor: Cursor,
    readonly posts: Array<{
      id: number;
      createdAt: Date;
      isPublished: boolean;
      postTitle: string;
      postedUser: Pick<FindUserResult, 'id' | 'nickname' | 'profileImg'>;
      postImages: FindPostImageResult[];
    }>,
  ) {
    super(totalResults, cursor);
  }

  static of(postList: FindPostListResult[], totalResults: number, cursor: Cursor): FindPostListRes {
    return new FindPostListRes(totalResults, cursor, postList);
  }
}
