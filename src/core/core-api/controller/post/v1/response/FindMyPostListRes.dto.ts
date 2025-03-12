import { Cursor } from 'typeorm-cursor-pagination';

import { FindPostImageResult } from '@src/core/core-domain/domain/post/result/FindPostImageResult';
import { FindPostListResult } from '@src/core/core-domain/domain/post/result/FindPostListResult';
import { FindUserResult } from '@src/core/core-domain/domain/user/result/FindUserResult';

export class FindMyPostListRes {
  constructor(
    readonly totalResults: number,
    readonly cursor: Cursor,
    readonly posts: Array<{
      id: number;
      createdAt: Date;
      isPublished: boolean;
      postTitle: string | null;
      postedUser: Pick<FindUserResult, 'id' | 'nickname' | 'profileImg'>;
      postImages: FindPostImageResult[];
    }>,
  ) {}

  static of(postList: FindPostListResult[], totalResults: number, cursor: Cursor): FindMyPostListRes {
    return new FindMyPostListRes(totalResults, cursor, postList);
  }
}
