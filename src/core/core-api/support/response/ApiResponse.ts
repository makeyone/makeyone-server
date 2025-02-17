import { ApiResponseResultTypeUnion } from '@src/core/core-api/support/response/ApiResponseResultType';

import { CoreErrorMessage } from '@src/core/core-domain/support/error/CoreErrorMessage';

export class ApiResponse<T> {
  constructor(
    private readonly result: ApiResponseResultTypeUnion,
    private readonly data: T = null,
    private readonly error: CoreErrorMessage = null,
  ) {}

  static success(): ApiResponse<null> {
    return new ApiResponse('SUCCESS', null, null);
  }

  static successWithData<S>(data: S): ApiResponse<S> {
    return new ApiResponse('SUCCESS', data, null);
  }

  static error<S>(errorCode: string, errorMessage: string, errorData?: any): ApiResponse<S | null> {
    return new ApiResponse('ERROR', null, new CoreErrorMessage(errorCode, errorMessage, errorData));
  }
}
