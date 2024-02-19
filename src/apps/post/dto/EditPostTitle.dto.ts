import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

import { CoreOutput } from '@src/libs/entity/domain/common/Core.dto';

export class EditPostTitleParam {
  @IsNumber()
  postId: number;
}

export class EditPostTitleInput {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  postTitle: string;
}

export class EditPostTitleOutput extends CoreOutput {
  editedPostId?: number;
}
