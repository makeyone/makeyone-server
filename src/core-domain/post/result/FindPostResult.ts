import { FindUserResult } from '@src/core-domain/user/result/FindUserResult';

export class FindPostResult {
  id: number;
  createdAt: Date;
  isPublished: boolean;
  postTitle: string | null;
  postContent: string | null;
  postedUser: Pick<FindUserResult, 'id' | 'nickname' | 'profileImg'>;
}
