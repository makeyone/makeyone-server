import { IsNumber, IsOptional, IsString } from 'class-validator';

import { EditPostContentData } from '@src/core/core-domain/domain/post/data/EditPostContentData';

export class EditPostContentParam {
  @IsNumber()
  postId: number;
}

export class EditPostContentReq {
  @IsOptional()
  @IsString()
  postContent?: string;

  toEditPostContent(): EditPostContentData {
    return new EditPostContentData(this.postContent || '');
  }
}
