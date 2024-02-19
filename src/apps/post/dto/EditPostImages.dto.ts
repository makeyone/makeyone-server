import { ArrayMinSize, IsNumber, IsString } from 'class-validator';

import { CoreOutput } from '@src/libs/entity/domain/common/Core.dto';

export class EditPostImagesParam {
  @IsNumber()
  postId: number;
}

export class EditPostImagesInput {
  @IsString({ each: true })
  @ArrayMinSize(1)
  postImages: string[];
}

export class EditPostImagesOutput extends CoreOutput {
  editedPostId?: number;
}
