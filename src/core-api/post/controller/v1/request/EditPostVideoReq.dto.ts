import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

import { EditPostVideoData } from '@src/core-domain/post/data/EditPostVideoData';

export class EditPostVideoParam {
  @IsNumber()
  postId: number;
}

export class EditPostVideoReq {
  @IsNotEmpty()
  @IsString()
  @MaxLength(3000)
  youtubeVideoUrl: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  remark?: string;

  toEditPostVideo(): EditPostVideoData {
    return new EditPostVideoData(this.youtubeVideoUrl, this.remark);
  }
}
