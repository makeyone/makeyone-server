import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

import { CoreOutput } from '@src/libs/entity/domain/common/Core.dto';

export class EditPostVideoParam {
  @IsNumber()
  postId: number;
}

export class EditPostVideoInput {
  @IsNotEmpty()
  @IsString()
  @MaxLength(3000)
  youtubeVideoUrl: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  remark?: string;
}

export class EditPostVideoOutput extends CoreOutput {
  editedPostId?: number;
}
