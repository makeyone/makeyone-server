import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNumber, ValidateNested } from 'class-validator';

import { CoreOutput } from '@src/libs/entity/domain/common/Core.dto';

export class EditPostSwitchOnLayoutParam {
  @IsNumber()
  postId: number;
}

class SwitchOnKey {
  @IsNumber()
  row: number;

  @IsNumber()
  col: number;
}

export class EditPostSwitchOnLayoutInput {
  @IsNumber()
  switchId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => SwitchOnKey)
  keys: SwitchOnKey[];
}

export class EditPostSwitchOnLayoutOutput extends CoreOutput {
  editedPostId?: number;
}
