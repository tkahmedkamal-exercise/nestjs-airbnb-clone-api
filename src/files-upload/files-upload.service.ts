import { DeleteFileByUrlUseCase } from './usecases/delete-file-by-url.usecase';
import { UploadMultipleFileUseCase } from './usecases/upload.multiple-files.usecase';
import { UploadSingleFileUseCase } from './usecases/upload-single-file.usecase';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesUploadService {
  constructor(
    private readonly uploadSingleFileUseCase: UploadSingleFileUseCase,
    private readonly uploadMultipleFileUseCase: UploadMultipleFileUseCase,
    private readonly deleteFileByUrlUseCase: DeleteFileByUrlUseCase,
  ) {}

  uploadFile(file: Express.Multer.File) {
    return this.uploadSingleFileUseCase.execute(file);
  }

  uploadFiles(files: Express.Multer.File[]) {
    return this.uploadMultipleFileUseCase.execute(files);
  }

  deleteFiles(url: string | string[]) {
    return this.deleteFileByUrlUseCase.execute(url);
  }
}
