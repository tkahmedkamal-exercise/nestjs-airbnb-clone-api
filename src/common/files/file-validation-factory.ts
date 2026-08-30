import {
  FileTypeValidator,
  FileValidator,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';
import bytes from 'bytes';
import { lookup } from 'mime-types';
import { FileSignatureValidator } from './custom-validators/file-signature.validator';
import { UnprocessableEntityException } from '../error-handling/custom-exceptions/unprocessable-entity.exception';

type NonEmptyArray<T> = [T, ...T[]];
type FileSize = `${number}${'KB' | 'MB' | 'GB' | 'TB'}`;
type FileType = 'png' | 'jpg' | 'jpeg' | 'jpg' | 'webp';

export const MAX_FILE_COUNT = {
  UNITS_IMAGES: 5,
} as const satisfies Record<string, number>;

const createFileTypeRegex = (types: FileType[]) => {
  const fileTypes = types.map((type) => lookup(type)).filter(Boolean);
  return new RegExp(fileTypes.join('|'));
};

const createFileValidators = (
  maxSize: FileSize,
  fileTypes: NonEmptyArray<FileType>,
): FileValidator[] => {
  return [
    new MaxFileSizeValidator({
      maxSize: bytes(maxSize),
      errorMessage: (ctx) =>
        `File is too big. Max file size is ${maxSize}, but the actual size is ${bytes(ctx.file?.size as number)}`,
    }),
    new FileTypeValidator({
      fileType: createFileTypeRegex(fileTypes),
    }),
    new FileSignatureValidator(),
  ];
};

export const createParseFilePipe = (
  maxSize: FileSize,
  fileTypes: NonEmptyArray<FileType>,
) => {
  return new ParseFilePipe({
    validators: createFileValidators(maxSize, fileTypes),
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    fileIsRequired: true,
    exceptionFactory: (error: string) => {
      throw new UnprocessableEntityException(error);
    },
  });
};
