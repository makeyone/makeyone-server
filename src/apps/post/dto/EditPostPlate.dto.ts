import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

import { CoreOutput } from '@src/libs/entity/domain/common/Core.dto';
import {
  KeyboardPlateTextureUnion,
  keyboardPlateTextureKeys,
} from '@src/libs/entity/domain/post/enums/KeyboardPlateTexture.enum';

export class EditPostPlateParam {
  @IsNumber()
  postId: number;
}

export class EditPostPlateInput {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  plateName: string;

  @IsEnum(keyboardPlateTextureKeys)
  plateTexture: KeyboardPlateTextureUnion;

  @IsBoolean()
  isFlexCutPlate: boolean;

  @IsBoolean()
  isHalfPlate: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  remark?: string;
}

export class EditPostPlateOutput extends CoreOutput {
  editedPostId?: number;
}
