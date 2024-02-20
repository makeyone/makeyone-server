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

import { CoreOutput } from '@src/libs/entity/domain/common/Core.dto';
import {
  KeyboardKeycapProfileUnion,
  keyboardKeycapProfileKeys,
} from '@src/libs/entity/domain/post/enums/KeyboardKeycapProfile.enum';
import {
  KeyboardKeycapTextureUnion,
  keyboardKeycapTextureKeys,
} from '@src/libs/entity/domain/post/enums/KeyboardKeycapTexture.enum';

export class EditPostKeycapParam {
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

export class EditPostKeycapInput {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => EditPostKeycap)
  keycaps: EditPostKeycap[];
}

export class EditPostKeycapOutput extends CoreOutput {
  editedPostId?: number;
}
