import { VIADefinitionV2, VIADefinitionV3 } from '@the-via/reader';
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsObject, IsOptional } from 'class-validator';

import { EditPostKeyboardDefinitionData } from '@src/core/core-domain/domain/post/data/EditPostKeyboardDefinitionData';

export class EditPostKeyboardDefinitionParam {
  @IsNumber()
  postId: number;
}

export class EditPostKeyboardDefinitionReq {
  @IsNotEmpty()
  @IsObject()
  keyboardDefinition: VIADefinitionV2 | VIADefinitionV3;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  layoutOptionKeys?: number[];

  toEditPostKeyboardDefinition(): EditPostKeyboardDefinitionData {
    return new EditPostKeyboardDefinitionData(this.keyboardDefinition, this.layoutOptionKeys);
  }
}
