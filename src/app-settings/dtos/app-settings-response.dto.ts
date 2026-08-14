import { Expose, Transform, Type } from 'class-transformer';

export class AppSettingsResponseDto {
  @Expose({ name: '_id' })
  id: string;

  @Expose()
  @Type(() => Number)
  vatRate: string;

  @Expose()
  @Type(() => Number)
  minPrice: string;

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
