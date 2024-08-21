import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNumber, ValidateNested } from 'class-validator';

import { EditPostKeycapOnLayoutData } from '@src/core-domain/post/data/EditPostKeycapOnLayoutData';

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

export class EditPostKeycapOnLayoutReq {
  @IsNumber()
  keycapId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => KeycapOnKey)
  keys: KeycapOnKey[];

  toEditPostKeycapOnLayoutData(): EditPostKeycapOnLayoutData[] {
    return this.keys.map((key) => new EditPostKeycapOnLayoutData(key.row, key.col));
  }
}
