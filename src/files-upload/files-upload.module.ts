import { Module } from '@nestjs/common';
import { UploadMultipleFileUseCase } from './usecases/upload.multiple-files.usecase';
import { UploadSingleFileUseCase } from './usecases/upload-single-file.usecase';
import { FilesUploadService } from './files-upload.service';
import { DeleteFileByUrlUseCase } from './usecases/delete-file-by-url.usecase';
import { S3StorageService } from './storage/s3/s3-storage.service';

@Module({
  providers: [
    FilesUploadService,
    UploadSingleFileUseCase,
    UploadMultipleFileUseCase,
    DeleteFileByUrlUseCase,
    S3StorageService,
    UploadSingleFileUseCase,
  ],
  exports: [FilesUploadService, S3StorageService],
})
export class FilesUploadModule {}
