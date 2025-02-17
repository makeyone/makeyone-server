import { IsBoolean, IsNumber } from 'class-validator';

import { EditPostSettingData } from '@src/core/core-domain/domain/post/data/EditPostSettingData';

export class EditPostSettingParam {
  @IsNumber()
  postId: number;
}

export class EditPostSettingReq {
  @IsBoolean()
  isPublished: boolean;

  toEditPostSetting(): EditPostSettingData {
    return new EditPostSettingData(this.isPublished);
  }
}
