import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNumber, ValidateNested } from 'class-validator';

import { EditPostSwitchOnLayoutData } from '@src/core-domain/post/data/EditPostSwitchOnLayoutData';

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

export class EditPostSwitchOnLayoutReq {
  @IsNumber()
  switchId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => SwitchOnKey)
  keys: SwitchOnKey[];

  toEditPostSwitchOnLayoutData(): EditPostSwitchOnLayoutData[] {
    return this.keys.map((key) => new EditPostSwitchOnLayoutData(key.row, key.col));
  }
}
