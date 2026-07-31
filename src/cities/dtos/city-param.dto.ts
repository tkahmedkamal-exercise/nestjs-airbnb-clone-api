import { IsMongoId } from 'class-validator';

export class CityParamDto {
  @IsMongoId({
    message: 'Param must be a valid mongo id',
  })
  id: string;
}
