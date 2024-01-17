import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

import { ErrorOutput } from '@src/libs/entity/domain/common/Core.dto';
import httpExceptionLog from '@src/libs/logger/HttpExceptionLog';
import { ValueOf } from '@src/libs/utils/ts-value-of';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    let statusCode = (exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR) as ValueOf<
      typeof HttpStatus
    >;
    let errorMessage = (exception as any).message;
    let errorData = null; // custom으로 errorData를 넣을 시 꼭 JSON.stringify를 사용한 문자열이어야 함.
    try {
      errorData = JSON.parse((exception as any).response.error);
    } catch (err) {
      errorData = null;
    }

    switch (exception.constructor) {
      case HttpException:
        break;

      case BadRequestException:
        errorMessage = 'BAD_REQUEST_ERROR';
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
        break;

      case QueryFailedError:
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        break;

      default:
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        errorData = errorMessage;
        errorMessage = 'SERVER_ERROR';
    }

    const statusCodeType = Object.keys(HttpStatus).find((key) => HttpStatus[key] === statusCode) as keyof typeof HttpStatus;
    const errorName = exception.name;
    const errorStack = exception.stack;

    // Error Log 기록
    if (req.body?.password) {
      // 만약 body에 password값이 포함되어있다면 masking 처리한다.
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
        message: errorMessage,
        ...(errorData && { data: errorData }),
        stack: errorStack,
      },
    };
    httpExceptionLog(statusCode, log);

    // Error Response
    const errorResponse: ErrorOutput = {
      ok: false,
      error: {
        statusType: statusCodeType,
        statusCode,
        message: errorMessage,
        ...(errorData && { data: errorData }),
      },
    };
    res.status(statusCode).json(errorResponse);
  }
}
