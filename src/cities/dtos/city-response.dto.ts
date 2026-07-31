import { Expose, Transform } from 'class-transformer';
import { CountryResponseDto } from '../../country/dtos/country-response.dto';

export class CityResponseDto {
  @Expose({ name: '_id' })
  id: string;

  @Expose()
  name: string;

  @Expose()
  @Transform(({ value }) => {
    return Object.fromEntries(
      Object.entries(value).filter(([key, value]) => value !== null),
    );
  })
  country: CountryResponseDto;

  @Expose()
  isDeleted: boolean;

  @Expose()
  @Transform(({ value }: { value?: Date }) => value ?? null)
  deletedAt: Date;

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;
}
