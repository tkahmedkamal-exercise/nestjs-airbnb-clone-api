import { Expose, Transform } from 'class-transformer';
import { Types } from 'mongoose';

export class CountryResponseDto {
  @Expose({ name: '_id' })
  id: string;

  @Expose()
  name: string;

  @Expose()
  @Transform(({ value }: { value?: string }) => value?.toUpperCase() ?? null)
  code: string;

  @Expose()
  isDeleted: boolean;

  @Expose()
  @Transform(({ value }: { value?: Date }) => value ?? null)
  deletedAt: Date;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
