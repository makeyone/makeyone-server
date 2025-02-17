import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  PayloadTooLargeException,
  UnauthorizedException,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

import { ApiResponse } from '@src/core/core-api/support/response/ApiResponse';

import { CoreErrorType } from '@src/core/core-domain/support/error/CoreErrorType';

import httpExceptionLog from '@src/support/logging/HttpExceptionLog';

import { ValueOf } from '@src/util/TSValueOf';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const statusCode = (
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    ) as ValueOf<typeof HttpStatus>;

    let errorType = CoreErrorType.DEFAULT_ERROR;
    let errorData = (exception as any).response?.errorData || null;

    if (
      exception instanceof HttpException &&
      (exception.getResponse() instanceof CoreErrorType ||
        (exception.getResponse() as any).errorType instanceof CoreErrorType)
    ) {
      if (!errorData) {
        errorType = exception.getResponse() as CoreErrorType;
      }

      if (errorData) {
        errorType = (exception.getResponse() as any).errorType as CoreErrorType;
      }
    } else {
      switch (exception.constructor) {
        case HttpException:
          break;

        case BadRequestException:
          errorType = CoreErrorType.DEFAULT_BAD_REQUEST_ERROR;
          errorData = (
            (exception as BadRequestException).getResponse() as {
              statusCode: ValueOf<typeof HttpStatus>;
              message: string | string[];
              error: string;
            }
          ).message;
          break;

        case UnauthorizedException:
          break;

        case ForbiddenException:
          break;

        case NotFoundException:
          errorType = CoreErrorType.DEFAULT_NOT_FOUND;
          break;

        case PayloadTooLargeException:
          errorType = CoreErrorType.PAYLOAD_TOO_LARGE;
          break;

        case InternalServerErrorException:
          break;

        case QueryFailedError:
          break;

        default:
          errorData = exception;
          break;
      }
    }

    const errorName = exception.name;
    const errorStack = exception.stack;

    if (req.body?.password) {
      req.body.password = 'hashed-password';
    }
    const log = {
      timestamp: new Date(),
      status: statusCode,
      request: {
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: req.body,
        params: req.params,
        query: req.query,
      },
      error: {
        name: errorName,
        message: errorType.message,
        ...(errorData && { data: errorData }),
        stack: errorStack,
      },
    };
    httpExceptionLog(statusCode, log);

    const errorRes = ApiResponse.error<any>(errorType.code, errorType.message, errorData);
    const result = instanceToPlain(errorRes);

    res.status(statusCode).json(result);
  }
}
