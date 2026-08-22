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
  user: string;

  @IsNumber()
  @IsNotEmpty()
  roomsCount: number;

  @IsNumber()
  @IsNotEmpty()
  adultsCount: number;

  @IsNumber()
  @IsNotEmpty()
  kidsCount: number;

  @IsBoolean()
  @IsNotEmpty()
  hasInternetService: boolean;

  @IsBoolean()
  @IsNotEmpty()
  hasKitchen: boolean;

  @IsBoolean()
  @IsOptional()
  hasPrivateGarage: boolean;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
