import { IsNotEmpty, IsString } from 'class-validator';

import { CoreOutput } from '@src/libs/entity/domain/common/Core.dto';

export class RefreshTokenInput {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}

export class RefreshTokenOutput extends CoreOutput {}
