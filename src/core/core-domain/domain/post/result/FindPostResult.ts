import { FindUserResult } from '@src/core/core-domain/domain/user/result/FindUserResult';

export class FindPostResult {
  constructor(
    readonly id: number,
    readonly createdAt: Date,
    readonly isPublished: boolean,
    readonly postTitle: string | null,
    readonly postContent: string | null,
    readonly postedUser: Pick<FindUserResult, 'id' | 'nickname' | 'profileImg'>,
  ) {}
}
