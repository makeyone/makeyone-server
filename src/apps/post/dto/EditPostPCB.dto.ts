import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

import { CoreOutput } from '@src/libs/entity/domain/common/Core.dto';
import { KeyboardPCBTypeUnion, keyboardPCBTypeKeys } from '@src/libs/entity/domain/post/enums/KeyboardPCBType.enum';

export class EditPostPCBParam {
  @IsNumber()
  postId: number;
}

export class EditPostPCBInput {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  pcbName: string;

  @IsEnum(keyboardPCBTypeKeys)
  pcbType: KeyboardPCBTypeUnion;

  @IsBoolean()
  isRgbPcb: boolean;

  @IsBoolean()
  isFlexCutPcb: boolean;

  @IsOptional()
  @IsNumber()
  pcbThickness: number;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  remark?: string;
}

export class EditPostPCBOutput extends CoreOutput {
  editedPostId?: number;
}
