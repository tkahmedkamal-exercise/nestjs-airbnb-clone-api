import { CountryResponseDto } from './country-response.dto';
import { Expose, Type } from 'class-transformer';

export class FindAllDto {
  @Expose()
  @Type(() => CountryResponseDto)
  data: CountryResponseDto[];

  @Expose()
  totalCount: number;

  @Expose()
  page: number;

  @Expose()
  limit: number;

  @Expose()
  pageCount: number;
}
