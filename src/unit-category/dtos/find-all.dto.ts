import { UnitCategoryResponseDto } from './unit-category-response.dto';
import { Expose, Type } from 'class-transformer';

export class FindAllDto {
  @Expose()
  @Type(() => UnitCategoryResponseDto)
  data: UnitCategoryResponseDto[];

  @Expose()
  totalCount: number;

  @Expose()
  page: number;

  @Expose()
  limit: number;

  @Expose()
  pageCount: number;
}
