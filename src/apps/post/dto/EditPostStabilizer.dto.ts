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
  KeyboardStabilizerMountUnion,
  keyboardStabilizerMountKeys,
} from '@src/libs/entity/domain/post/enums/KeyboardStabilizerMount.enum';
import {
  KeyboardStabilizerTypeUnion,
  keyboardStabilizerTypeKeys,
} from '@src/libs/entity/domain/post/enums/KeyboardStabilizerType.enum';

export class EditPostStabilizerParam {
  @IsNumber()
  postId: number;
}

class EditPostStabilizer {
  @IsOptional()
  @IsNumber()
  stabilizerId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  stabilizerName: string;

  @IsEnum(keyboardStabilizerTypeKeys)
  stabilizerType: KeyboardStabilizerTypeUnion;

  @IsEnum(keyboardStabilizerMountKeys)
  stabilizerMount: KeyboardStabilizerMountUnion;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  remark?: string;
}

export class EditPostStabilizerInput {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => EditPostStabilizer)
  stabilizers: EditPostStabilizer[];
}

export class EditPostStabilizerOutput extends CoreOutput {
  editedPostId?: number;
}
