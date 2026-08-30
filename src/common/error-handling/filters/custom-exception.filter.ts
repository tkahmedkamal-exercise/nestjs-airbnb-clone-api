import { BaseCustomException } from '../custom-exceptions/base-custom-exception';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { I18nValidationException } from 'nestjs-i18n/dist/interfaces';
import { formatInputValidationError } from '../input-validation/format-input-validation-error';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    if (exception instanceof BaseCustomException) {
      return response.status(exception.status).json({
        errors: exception.format(),
      });
    }

    if (exception instanceof I18nValidationException) {
      const inputFormatError = formatInputValidationError(exception.errors);

      return response.status(400).json({
        errors: inputFormatError,
      });
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();

      return response.status(status).json({
        errors: {
          message: exception.message,
        },
      });
    }

    return response.status(500).json({
      errors: {
        message: (exception as Error).message,
      },
    });
  }
}
