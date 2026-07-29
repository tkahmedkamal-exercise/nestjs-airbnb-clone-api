import { IsMongoId } from 'class-validator';

export class CountryParamDto {
  @IsMongoId({
    message: 'Param must be a valid mongo id',
  })
  id: string;
}
