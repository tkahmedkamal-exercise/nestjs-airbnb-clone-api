import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class FindAllQueryDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit: number;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  ignoreLimit: boolean;

  @IsString()
  @IsOptional()
  sort: 'ASC' | 'DESC';
}
