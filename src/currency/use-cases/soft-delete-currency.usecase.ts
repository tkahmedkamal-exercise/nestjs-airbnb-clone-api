import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Currency } from '../schemas/currency.schema';
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '../../common/error-handling/custom-exceptions/not-found.exception';
import { MODEL_NAMES } from '../../common/data-access';

@Injectable()
export class SoftDeleteCurrencyUseCase {
  constructor(
    @InjectModel(MODEL_NAMES.CURRENCIES)
    private readonly currencyModel: Model<Currency>,
  ) {}

  async execute(id: string) {
    const currency = await this.currencyModel.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!currency) {
      throw new NotFoundException('Currency not found');
    }

    await this.currencyModel.findByIdAndUpdate(id, {
      isDeleted: true,
      deletedAt: new Date().toISOString(),
    });
  }
}
