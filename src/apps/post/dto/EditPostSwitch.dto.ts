import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

import { CoreOutput } from '@src/libs/entity/domain/common/Core.dto';
import { KeyboardSwitchLubeUnion, keyboardSwitchLubeKeys } from '@src/libs/entity/domain/post/enums/KeyboardSwitchLube.enum';
import { KeyboardSwitchTypeUnion, keyboardSwitchTypeKeys } from '@src/libs/entity/domain/post/enums/KeyboardSwitchType.enum';

export class EditPostSwitchParam {
  @IsNumber()
  postId: number;
}

class EditPostSwitch {
  @IsOptional()
  @IsNumber()
  switchId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  switchName: string;

  @IsEnum(keyboardSwitchTypeKeys)
  switchType: KeyboardSwitchTypeUnion;

  @IsBoolean()
  isSlientSwitch: boolean;

  @IsEnum(keyboardSwitchLubeKeys)
  switchLube: KeyboardSwitchLubeUnion;

  @IsOptional()
  @IsNumber()
  bottomOutForce?: number;

  @IsOptional()
  @IsNumber()
  springLength?: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  switchFilm?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  remark?: string;
}

export class EditPostSwitchInput {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => EditPostSwitch)
  switches: EditPostSwitch[];
}

export class EditPostSwitchOutput extends CoreOutput {
  editedPostId?: number;
}
