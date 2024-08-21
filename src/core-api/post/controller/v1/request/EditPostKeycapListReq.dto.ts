import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

import { keyboardKeycapProfileKeys, KeyboardKeycapProfileUnion } from '@src/core-enum/Post/KeyboardKeycapProfile.enum';
import { keyboardKeycapTextureKeys, KeyboardKeycapTextureUnion } from '@src/core-enum/Post/KeyboardKeycapTexture.enum';

import { EditPostKeycapData } from '@src/core-domain/post/data/EditPostKeycapData';

export class EditPostKeycapListParam {
  @IsNumber()
  postId: number;
}

class EditPostKeycap {
  @IsOptional()
  @IsNumber()
  keycapId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  keycapName: string;

  @IsEnum(keyboardKeycapProfileKeys)
  keycapProfile: KeyboardKeycapProfileUnion;

  @IsEnum(keyboardKeycapTextureKeys)
  keycapTexture: KeyboardKeycapTextureUnion;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  manufacturer?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  remark?: string;
}

export class EditPostKeycapListReq {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => EditPostKeycap)
  keycaps: EditPostKeycap[];

  toEditPostKeycapList(): EditPostKeycapData[] {
    return this.keycaps.map(
      (item) =>
        new EditPostKeycapData(
          item.keycapId || null,
          item.keycapName,
          item.keycapProfile,
          item.keycapTexture,
          item.manufacturer,
          item.remark,
        ),
    );
  }
}
