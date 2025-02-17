import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

import {
  keyboardPrintedCircuitBoardTypeKeys,
  KeyboardPrintedCircuitBoardTypeUnion,
} from '@src/core/core-enum/Post/KeyboardPCBType.enum';

import { EditPostPrintedCircuitBoardData } from '@src/core/core-domain/domain/post/data/EditPostPrintedCircuitBoardData';

export class EditPostPrintedCircuitBoardParam {
  @IsNumber()
  postId: number;
}

export class EditPostPrintedCircuitBoardReq {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  pcbName: string;

  @IsEnum(keyboardPrintedCircuitBoardTypeKeys)
  pcbType: KeyboardPrintedCircuitBoardTypeUnion;

  @IsBoolean()
  isRgbPcb: boolean;

  @IsBoolean()
  isFlexCutPcb: boolean;

  @IsOptional()
  @IsNumber()
  pcbThickness?: number;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  remark?: string;

  toEditPostPrintedCircuitBoard(): EditPostPrintedCircuitBoardData {
    return new EditPostPrintedCircuitBoardData(
      this.pcbName,
      this.pcbType,
      this.isRgbPcb,
      this.isFlexCutPcb,
      this.pcbThickness,
      this.remark,
    );
  }
}
