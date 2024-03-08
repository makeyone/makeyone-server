import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNumber, ValidateNested } from 'class-validator';

import { CoreOutput } from '@src/libs/entity/domain/common/Core.dto';

export class EditPostKeycapOnLayoutParam {
  @IsNumber()
  postId: number;
}

class KeycapOnKey {
  @IsNumber()
  row: number;

  @IsNumber()
  col: number;
}

export class EditPostKeycapOnLayoutInput {
  @IsNumber()
  keycapId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => KeycapOnKey)
  keys: KeycapOnKey[];
}

export class EditPostKeycapOnLayoutOutput extends CoreOutput {
  editedPostId?: number;
}
