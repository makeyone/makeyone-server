import { ArrayMinSize, IsNumber, IsString } from 'class-validator';

import { EditPostImageData } from '@src/core-domain/post/data/EditPostImageData';

export class EditPostImageListParam {
  @IsNumber()
  postId: number;
}

export class EditPostImageListReq {
  @IsString({ each: true })
  @ArrayMinSize(1)
  postImageList: string[];

  toEditPostImageList(): EditPostImageData[] {
    return this.postImageList.map((image) => new EditPostImageData(image));
  }
}
