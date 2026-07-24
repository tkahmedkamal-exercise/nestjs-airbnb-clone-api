import { ValidationError } from 'class-validator';
import { ErrorResponse } from '../error-response.interface';

export const formatInputValidationError = (
  errors: ValidationError[],
): ErrorResponse[] => {
  return errors.flatMap((error) => {
    const field = error.property;
    const messages = Object.values(error.constraints ?? {});

    return messages.map((message): ErrorResponse => ({
      field,
      message,
    }));
  });
};
