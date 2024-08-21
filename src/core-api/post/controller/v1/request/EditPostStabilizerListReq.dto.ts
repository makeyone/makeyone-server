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

import {
  keyboardStabilizerMountKeys,
  KeyboardStabilizerMountUnion,
} from '@src/core-enum/Post/KeyboardStabilizerMount.enum';
import {
  keyboardStabilizerTypeKeys,
  KeyboardStabilizerTypeUnion,
} from '@src/core-enum/Post/KeyboardStabilizerType.enum';

import { EditPostStabilizerData } from '@src/core-domain/post/data/EditPostStabilizerData';

export class EditPostStabilizerListParam {
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

export class EditPostStabilizerListReq {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => EditPostStabilizer)
  stabilizers: EditPostStabilizer[];

  toEditPostStabilizerList(): EditPostStabilizerData[] {
    return this.stabilizers.map(
      (item) =>
        new EditPostStabilizerData(
          item.stabilizerId || null,
          item.stabilizerName,
          item.stabilizerType,
          item.stabilizerMount,
          item.remark,
        ),
    );
  }
}
