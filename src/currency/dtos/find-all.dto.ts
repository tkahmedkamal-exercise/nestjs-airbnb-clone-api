import { CurrencyResponseDto } from './currency-response.dto';
import { Expose, Type } from 'class-transformer';

export class FindAllDto {
  @Expose()
  @Type(() => CurrencyResponseDto)
  data: CurrencyResponseDto[];

  @Expose()
  totalCount: number;

  @Expose()
  page: number;

  @Expose()
  limit: number;

  @Expose()
  pageCount: number;
}
