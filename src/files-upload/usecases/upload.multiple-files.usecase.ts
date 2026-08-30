import { Injectable } from '@nestjs/common';
import { S3StorageService } from '../storage/s3/s3-storage.service';
import { UploadSingleFileUseCase } from './upload-single-file.usecase';

@Injectable()
export class UploadMultipleFileUseCase {
  constructor(
    private readonly uploadSingleFileUseCase: UploadSingleFileUseCase,
  ) {}

  async execute(files: Express.Multer.File[]): Promise<string[]> {
    return Promise.all(
      files.map((file) => this.uploadSingleFileUseCase.execute(file)),
    );
  }
}
