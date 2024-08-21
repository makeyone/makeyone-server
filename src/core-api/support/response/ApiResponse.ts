import { CoreErrorMessage } from '@src/core-api/support/error/CoreErrorMessage';
import { CoreErrorType } from '@src/core-api/support/error/CoreErrorType';
import { ApiResponseResultTypeUnion } from '@src/core-api/support/response/ApiResponseResultType';

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

  static error<S>(error: CoreErrorType, errorData?: any): ApiResponse<S> {
    return new ApiResponse('ERROR', null, new CoreErrorMessage(error.code, error.message, errorData));
  }
}
