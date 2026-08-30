import { Injectable } from '@nestjs/common';
import { S3StorageService } from '../storage/s3/s3-storage.service';

@Injectable()
export class UploadSingleFileUseCase {
  constructor(private readonly s3StorageService: S3StorageService) {}

  execute(file: Express.Multer.File): Promise<string> {
    return this.s3StorageService.uploadFile(file);
  }
}
