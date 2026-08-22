import { Expose } from 'class-transformer';

export class UnitResponseDto {
  @Expose({ name: '_id' })
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  address: string;

  @Expose()
  photos: string[];

  @Expose()
  costPerDay: number;

  @Expose()
  country: string;

  @Expose()
  city: string;

  @Expose()
  unitCategory: string;

  @Expose()
  user: string;

  @Expose()
  roomsCount: number;

  @Expose()
  adultsCount: number;

  @Expose()
  kidsCount: number;

  @Expose()
  hasInternetService: boolean;

  @Expose()
  hasKitchen: boolean;

  @Expose()
  hasPrivateGarage: boolean;

  @Expose()
  avgRate: number;

  @Expose()
  rateCount: number;

  @Expose()
  deletedAt: Date;

  @Expose()
  isDeleted: boolean;

  @Expose()
  isActive: boolean;
}
