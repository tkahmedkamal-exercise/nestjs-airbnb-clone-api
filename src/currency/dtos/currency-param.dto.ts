import { IsMongoId } from 'class-validator';

export class CurrencyParamDto {
  @IsMongoId({
    message: 'Param must be a valid mongo id',
  })
  id: string;
}
