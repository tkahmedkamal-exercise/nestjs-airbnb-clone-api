import { IsMongoId } from 'class-validator';

export class UnitCategoryParamDto {
  @IsMongoId({
    message: 'Param must be a valid mongo id',
  })
  id: string;
}
