import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

import { EditUserData } from '@src/core/core-domain/domain/user/data/EditUserData';

export class EditUserParam {
  @IsNumber()
  userId: number;
}

export class EditUserReq {
  @IsOptional()
  @IsString()
  @Length(1, 20)
  nickname?: string;

  @IsOptional()
  @IsString()
  @Length(1, 500)
  profileImgUrl?: string;

  toEditUserData(editUserId: number): EditUserData {
    return new EditUserData(editUserId, this.nickname, this.profileImgUrl);
  }
}
