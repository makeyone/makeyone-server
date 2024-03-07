import { VIADefinitionV2, VIADefinitionV3 } from '@the-via/reader';
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsObject, IsOptional } from 'class-validator';

import { CoreOutput } from '@src/libs/entity/domain/common/Core.dto';
import { PostKeyboardDefinitionEntity } from '@src/libs/entity/domain/post/PostKeyboardDefinition.entity';

export class EditPostKeyboardDefinitionParam {
  @IsNumber()
  postId: number;
}

export class EditPostKeyboardDefinitionInput {
  @IsNotEmpty()
  @IsObject()
  keyboardDefinition: VIADefinitionV2 | VIADefinitionV3;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  layoutOptionKeys?: number[];
}

export class EditPostKeyboardDefinitionOutput extends CoreOutput {
  editedPostId?: number;
  editedKeyboardLayout?: Pick<PostKeyboardDefinitionEntity, 'id' | 'definitionName' | 'keyboardDefinition' | 'layoutOptionKeys'>;
}
