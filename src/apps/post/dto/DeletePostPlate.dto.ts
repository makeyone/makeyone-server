import { IsNumber } from 'class-validator';

import { CoreOutput } from '@src/libs/entity/domain/common/Core.dto';

export class DeletePostPlateParam {
  @IsNumber()
  postId: number;
}

export class DeletePostPlateOutput extends CoreOutput {
  deletedPostId?: number;
}
