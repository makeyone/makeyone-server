import { IsBoolean, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

import { CoreOutput } from '@src/libs/entity/domain/common/Core.dto';

export class EditPostFoamParam {
  @IsNumber()
  postId: number;
}

export class EditPostFoamInput {
  @IsBoolean()
  plateBetweenPCBFoam: boolean;

  @IsBoolean()
  bottomSwitchPEFoam: boolean;

  @IsBoolean()
  bottomFoam: boolean;

  @IsBoolean()
  tapeMod: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  remark?: string;
}

export class EditPostFoamOutput extends CoreOutput {
  editedPostId?: number;
}
