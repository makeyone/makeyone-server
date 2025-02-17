import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

import {
  keyboardPlateTextureKeys,
  KeyboardPlateTextureUnion,
} from '@src/core/core-enum/Post/KeyboardPlateTexture.enum';

import { EditPostPlateData } from '@src/core/core-domain/domain/post/data/EditPostPlateData';

export class EditPostPlateParam {
  @IsNumber()
  postId: number;
}

export class EditPostPlateReq {
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

  toEditPostPlate(): EditPostPlateData {
    return new EditPostPlateData(this.plateName, this.plateTexture, this.isFlexCutPlate, this.isHalfPlate, this.remark);
  }
}
