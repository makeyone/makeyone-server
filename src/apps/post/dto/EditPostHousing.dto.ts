import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

import { CoreOutput } from '@src/libs/entity/domain/common/Core.dto';
import {
  KeyboardHousingFunctionKeyLayoutUnion,
  keyboardHousingFunctionKeyLayoutKeys,
} from '@src/libs/entity/domain/post/enums/KeyboardHousingFunctionKeyLayout.enum';
import {
  KeyboardHousingLayoutUnion,
  keyboardHousingLayoutKeys,
} from '@src/libs/entity/domain/post/enums/KeyboardHousingLayout.enum';
import {
  KeyboardHousingMountUnion,
  keyboardHousingMountKeys,
} from '@src/libs/entity/domain/post/enums/KeyboardHousingMount.enum';
import {
  KeyboardHousingWindowKeyLayoutUnion,
  keyboardHousingWindowKeyLayoutKeys,
} from '@src/libs/entity/domain/post/enums/KeyboardHousingWindowKeyLayout.enum';

export class EditPostHousingParam {
  @IsNumber()
  postId: number;
}

export class EditPostHousingInput {
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
}

export class EditPostHousingOutput extends CoreOutput {
  editedPostId?: number;
}
