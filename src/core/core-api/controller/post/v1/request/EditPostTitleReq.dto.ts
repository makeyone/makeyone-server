import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

import { EditPostTitleData } from '@src/core/core-domain/domain/post/data/EditPostTitleData';

export class EditPostTitleParam {
  @IsNumber()
  postId: number;
}

export class EditPostTitleReq {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  postTitle: string;

  toEditPostTitle(): EditPostTitleData {
    return new EditPostTitleData(this.postTitle);
  }
}
