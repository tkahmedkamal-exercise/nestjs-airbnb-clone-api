import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUnitDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  address: string;

  @IsOptional()
  photos: string[];

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  costPerDay: number;

  @IsNotEmpty()
  @IsMongoId()
  country: string;

  @IsNotEmpty()
  @IsMongoId()
  city: string;

  @IsNotEmpty()
  @IsMongoId()
  unitCategory: string;

  @IsOptional()
  @IsMongoId()
  user: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  roomsCount: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  adultsCount: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  kidsCount: number;

  @Type(() => Boolean)
  @IsBoolean()
  @IsNotEmpty()
  hasInternetService: boolean;

  @Type(() => Boolean)
  @IsBoolean()
  @IsNotEmpty()
  hasKitchen: boolean;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  hasPrivateGarage: boolean;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
