import { PostEntity } from '@src/database/entity/Post/Post.entity';

import { FindPostImageResult } from '@src/core-domain/post/result/FindPostImageResult';
import { FindUserResult } from '@src/core-domain/user/result/FindUserResult';

export class FindPostListResult {
  constructor(
    readonly id: number,
    readonly createdAt: Date,
    readonly isPublished: boolean,
    readonly postTitle: string,
    readonly postedUser: Pick<FindUserResult, 'id' | 'nickname' | 'profileImg'>,
    readonly postImages: FindPostImageResult[],
  ) {}

  static of(post: PostEntity, images: FindPostImageResult[]): FindPostListResult {
    return new FindPostListResult(post.id, post.createdAt, post.isPublished, post.postTitle, post.postedUser, images);
  }
}
