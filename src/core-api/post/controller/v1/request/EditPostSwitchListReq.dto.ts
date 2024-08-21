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

import { keyboardSwitchLubeKeys, KeyboardSwitchLubeUnion } from '@src/core-enum/Post/KeyboardSwitchLube.enum';
import { keyboardSwitchTypeKeys, KeyboardSwitchTypeUnion } from '@src/core-enum/Post/KeyboardSwitchType.enum';

import { EditPostSwitchData } from '@src/core-domain/post/data/EditPostSwitchData';

export class EditPostSwitchListParam {
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

export class EditPostSwitchListReq {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => EditPostSwitch)
  switches: EditPostSwitch[];

  toEditPostSwitchList(): EditPostSwitchData[] {
    return this.switches.map(
      (item) =>
        new EditPostSwitchData(
          item.switchId || null,
          item.switchName,
          item.switchType,
          item.isSlientSwitch,
          item.switchLube,
          item.bottomOutForce,
          item.springLength,
          item.switchFilm,
          item.remark,
        ),
    );
  }
}
