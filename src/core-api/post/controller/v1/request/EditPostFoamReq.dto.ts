import { IsBoolean, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

import { EditPostFoamData } from '@src/core-domain/post/data/EditPostFoamData';

export class EditPostFoamParam {
  @IsNumber()
  postId: number;
}

export class EditPostFoamReq {
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

  toEditPostFoam(): EditPostFoamData {
    return new EditPostFoamData(
      this.plateBetweenPCBFoam,
      this.bottomSwitchPEFoam,
      this.bottomFoam,
      this.tapeMod,
      this.remark,
    );
  }
}
