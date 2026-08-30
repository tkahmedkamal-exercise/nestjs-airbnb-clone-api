import { Injectable } from '@nestjs/common';
import { S3StorageService } from '../storage/s3/s3-storage.service';

@Injectable()
export class DeleteFileByUrlUseCase {
  constructor(private readonly s3StorageService: S3StorageService) {}

  async execute(url: string | string[]) {
    return this.s3StorageService.deleteFiles(url);
  }
}
