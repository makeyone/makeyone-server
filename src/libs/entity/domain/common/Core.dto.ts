import { HttpStatus } from '@nestjs/common';

import { ValueOf } from '@src/libs/utils/ts-value-of';

export class ErrorOutput {
  ok: false;
  error: {
    statusType: keyof typeof HttpStatus;
    statusCode: ValueOf<typeof HttpStatus>;
    message: string | string[];
    data?: any;
  };
}

export class CoreOutput {
  ok: boolean;
}
