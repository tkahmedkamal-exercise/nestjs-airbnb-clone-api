import { BaseRepository, MODEL_NAMES } from '../../common/data-access';
import { City } from '../schemas/city.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CityRepository extends BaseRepository<City> {
  constructor(
    @InjectModel(MODEL_NAMES.CITIES) private readonly cityModel: Model<City>,
  ) {
    super(cityModel);
  }
}
