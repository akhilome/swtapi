import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

import { ErrorResponseObject } from './http';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();

    let message: string, errors: string[] | null;

    const exceptionResponse = exception.getResponse() as
      | string
      | Record<string, string | string[]>;

    if (!exceptionResponse) {
      return response
        .status(status)
        .json(new ErrorResponseObject('An error occured'));
    }

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
      return response.status(status).json(new ErrorResponseObject(message));
    }

    if (Array.isArray(exceptionResponse.message)) {
      message = 'Provided parameters failed input validation';
      errors = exceptionResponse.message as string[];
    } else {
      message = exceptionResponse?.message as string;
      errors = null;
    }

    const data = errors ? { errors } : null;

    response.status(status).json(new ErrorResponseObject(message, data));
  }
}
