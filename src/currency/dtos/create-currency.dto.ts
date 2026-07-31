import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCurrencyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  code?: string;
}
