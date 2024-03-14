import { IsNumber, IsOptional, IsString } from 'class-validator';

import { CoreOutput } from '@src/libs/entity/domain/common/Core.dto';

export class EditPostContentParam {
  @IsNumber()
  postId: number;
}

export class EditPostContentInput {
  @IsOptional()
  @IsString()
  postContent?: string;
}

export class EditPostContentOutput extends CoreOutput {
  editedPostId?: number;
}
