import { IsBoolean, IsNumber } from 'class-validator';

import { CoreOutput } from '@src/libs/entity/domain/common/Core.dto';

export class EditPostSettingParam {
  @IsNumber()
  postId: number;
}

export class EditPostSettingInput {
  @IsBoolean()
  isPublished: boolean;
}

export class EditPostSettingOutput extends CoreOutput {
  editedPostId?: number;
}
