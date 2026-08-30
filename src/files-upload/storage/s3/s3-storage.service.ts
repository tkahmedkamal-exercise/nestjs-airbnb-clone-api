import { BadRequestException } from './../../../common/error-handling/custom-exceptions/bad-request.exception';
import { Injectable } from '@nestjs/common';
import { S3 } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { ConfigService } from '@nestjs/config';
import { AwsS3, Environment } from '../../../common/config/env.interface';
import { Readable } from 'node:stream';
import bytes from 'bytes';

@Injectable()
export class S3StorageService {
  private readonly s3Client: S3;
  private readonly bucketName: string;
  private readonly region: string;
  private readonly accessKeyId: string;
  private readonly secretAccessKey: string;
  private readonly endpoint?: string;

  constructor(private readonly configService: ConfigService<Environment>) {
    const { region, bucketName, accessKey, secretAccessKey, minioEndpoint } =
      this.configService.getOrThrow<AwsS3>('s3');

    this.region = region;
    this.accessKeyId = accessKey;
    this.secretAccessKey = secretAccessKey;
    this.endpoint = minioEndpoint;
    this.bucketName = bucketName;

    this.s3Client = new S3({
      region: this.region,
      endpoint: this.endpoint,
      forcePathStyle: Boolean(this.endpoint),
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
      },
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileName = this.generateUniqueFileName(file);

    const upload = new Upload({
      client: this.s3Client,
      params: {
        Bucket: this.bucketName,
        Key: fileName,
        Body: Readable.from(file.buffer),
        ContentType: file.mimetype,
      },
      queueSize: 4,
      partSize: bytes('5MB'),
    });

    upload.on('httpUploadProgress', (progress) => {
      console.log(`Upload progress ${JSON.stringify(progress, null, 2)}`);
    });

    try {
      const fileData = await upload.done();
      return fileData.Location ?? '';
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error as string);
    }
  }

  async deleteFiles(url: string | string[]) {
    const urls = Array.isArray(url) ? url : [url];

    if (urls.length === 0) {
      return;
    }

    try {
      const keys = urls.map((url) => {
        const urlObj = new URL(url);
        const pathname = urlObj.pathname;
        const bucketPrefix = `/${this.bucketName}`;

        return pathname.startsWith(bucketPrefix)
          ? pathname.slice(bucketPrefix.length)
          : pathname.slice(1);
      });

      console.log(keys);

      await this.s3Client.deleteObjects({
        Bucket: this.bucketName,
        Delete: {
          Objects: keys.map((url) => ({ Key: url })),
        },
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error as string);
    }
  }

  private generateUniqueFileName(file: Express.Multer.File): string {
    return `${Date.now()}-${file.originalname ?? file.filename}`;
  }
}
