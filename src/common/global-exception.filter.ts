import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { CustomError } from './custom.error';

import { ErrorResponseObject } from './http';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    const message =
      exception instanceof CustomError ? exception.message : 'An error occured';

    response.status(500).json(new ErrorResponseObject(message, null));
  }
}
