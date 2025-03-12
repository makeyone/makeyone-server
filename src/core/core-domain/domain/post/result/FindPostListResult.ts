import { FindPostImageResult } from '@src/core/core-domain/domain/post/result/FindPostImageResult';
import { FindPostResult } from '@src/core/core-domain/domain/post/result/FindPostResult';
import { FindUserResult } from '@src/core/core-domain/domain/user/result/FindUserResult';

export class FindPostListResult {
  constructor(
    readonly id: number,
    readonly createdAt: Date,
    readonly isPublished: boolean,
    readonly postTitle: string | null,
    readonly postedUser: Pick<FindUserResult, 'id' | 'nickname' | 'profileImg'> | null,
    readonly postImages: FindPostImageResult[],
  ) {}

  static of(post: FindPostResult, images: FindPostImageResult[]): FindPostListResult {
    return new FindPostListResult(
      post.id,
      post.createdAt,
      post.isPublished,
      post.postTitle || null,
      post.postedUser,
      images,
    );
  }
}
