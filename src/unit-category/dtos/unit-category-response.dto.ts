import { Expose, Transform } from 'class-transformer';

export class UnitCategoryResponseDto {
  @Expose({ name: '_id' })
  id: string;

  @Expose()
  name: string;

  @Expose()
  icon: string;

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
