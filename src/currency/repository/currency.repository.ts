import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Currency } from '../schemas/currency.schema';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository, MODEL_NAMES } from '../../common/data-access';

@Injectable()
export class CurrencyRepository extends BaseRepository<Currency> {
  constructor(
    @InjectModel(MODEL_NAMES.CURRENCIES)
    private readonly currencyModel: Model<Currency>,
  ) {
    super(currencyModel);
  }
}
