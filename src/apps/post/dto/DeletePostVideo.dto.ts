import { IsNumber } from 'class-validator';

import { CoreOutput } from '@src/libs/entity/domain/common/Core.dto';

export class DeletePostVideoParam {
  @IsNumber()
  postId: number;
}

export class DeletePostVideoOutput extends CoreOutput {
  deletedPostId?: number;
}
