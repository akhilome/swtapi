import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorResponseObject } from './http';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as
      | string
      | Record<string, any>;

    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : exceptionResponse.message;

    response.status(status).json(new ErrorResponseObject(message));
  }
}
