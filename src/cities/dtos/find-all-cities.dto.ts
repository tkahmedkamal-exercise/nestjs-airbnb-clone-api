import { Expose, Type } from 'class-transformer';
import { CityResponseDto } from './city-response.dto';

export class FindAllCitiesDto {
  @Expose()
  @Type(() => CityResponseDto)
  data: CityResponseDto[];

  @Expose()
  totalCount: number;

  @Expose()
  page: number;

  @Expose()
  limit: number;

  @Expose()
  pageCount: number;
}
