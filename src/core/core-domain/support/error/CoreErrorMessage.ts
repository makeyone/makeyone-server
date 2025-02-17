import { CoreErrorType } from '@src/core/core-domain/support/error/CoreErrorType';

export class CoreErrorMessage {
  code: string;
  message: string;
  data?: any;

  constructor(code: string, message: string, data?: any) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  static fromErrorType(errorType: CoreErrorType, data?: any): CoreErrorMessage {
    return new CoreErrorMessage(errorType.code, errorType.message, data);
  }
}
