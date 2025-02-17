import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

import {
  keyboardHousingFunctionKeyLayoutKeys,
  KeyboardHousingFunctionKeyLayoutUnion,
} from '@src/core/core-enum/Post/KeyboardHousingFunctionKeyLayout.enum';
import {
  keyboardHousingLayoutKeys,
  KeyboardHousingLayoutUnion,
} from '@src/core/core-enum/Post/KeyboardHousingLayout.enum';
import {
  keyboardHousingMountKeys,
  KeyboardHousingMountUnion,
} from '@src/core/core-enum/Post/KeyboardHousingMount.enum';
import {
  keyboardHousingWindowKeyLayoutKeys,
  KeyboardHousingWindowKeyLayoutUnion,
} from '@src/core/core-enum/Post/KeyboardHousingWindowKeyLayout.enum';

import { EditPostHousingData } from '@src/core/core-domain/domain/post/data/EditPostHousingData';

export class EditPostHousingParam {
  @IsNumber()
  postId: number;
}

export class EditPostHousingReq {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  housingName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  housingColor: string;

  @IsNotEmpty()
  @IsEnum(keyboardHousingMountKeys)
  housingMount: KeyboardHousingMountUnion;

  @IsNotEmpty()
  @IsEnum(keyboardHousingLayoutKeys)
  housingLayout: KeyboardHousingLayoutUnion;

  @IsNotEmpty()
  @IsEnum(keyboardHousingWindowKeyLayoutKeys)
  housingWindowKeyLayout: KeyboardHousingWindowKeyLayoutUnion;

  @IsNotEmpty()
  @IsEnum(keyboardHousingFunctionKeyLayoutKeys)
  housingFunctionKeyLayout: KeyboardHousingFunctionKeyLayoutUnion;

  @IsBoolean()
  isHousingReAnodized: boolean;

  toEditPostHousing(): EditPostHousingData {
    return new EditPostHousingData(
      this.housingName,
      this.housingColor,
      this.housingMount,
      this.housingLayout,
      this.housingWindowKeyLayout,
      this.housingFunctionKeyLayout,
      this.isHousingReAnodized,
    );
  }
}
