import { VIADefinitionV2, VIADefinitionV3 } from '@the-via/reader';
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsObject, IsOptional } from 'class-validator';

import { CoreOutput } from '@src/libs/entity/domain/common/Core.dto';
import { PostKeyboardLayoutEntity } from '@src/libs/entity/domain/post/PostKeyboardLayout.entity';

export class EditPostKeyboardLayoutParam {
  @IsNumber()
  postId: number;
}

export class EditPostKeyboardLayoutInput {
  @IsNotEmpty()
  @IsObject()
  keyboardLayout: VIADefinitionV2 | VIADefinitionV3;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  layoutOptions?: number[];
}

export class EditPostKeyboardLayoutOutput extends CoreOutput {
  editedPostId?: number;
  editedKeyboardLayout?: Pick<PostKeyboardLayoutEntity, 'id' | 'layoutName' | 'keyboardLayout' | 'layoutOptions'>;
}
