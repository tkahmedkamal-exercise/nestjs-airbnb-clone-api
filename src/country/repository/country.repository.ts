import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Country } from '../schemas/country.schema';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository, MODEL_NAMES } from '../../common/data-access';

@Injectable()
export class CountryRepository extends BaseRepository<Country> {
  constructor(
    @InjectModel(MODEL_NAMES.COUNTRIES)
    private readonly countryModel: Model<Country>,
  ) {
    super(countryModel);
  }
}
