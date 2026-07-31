import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Currency } from '../schemas/currency.schema';
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '../../common/error-handling/custom-exceptions/not-found.exception';
import { UpdateCurrencyDto } from '../dtos/update-currency.dto';
import { MODEL_NAMES } from '../../common/data-access';

@Injectable()
export class UpdateCurrencyUseCase {
  constructor(
    @InjectModel(MODEL_NAMES.CURRENCIES)
    private readonly currencyModel: Model<Currency>,
  ) {}

  async execute(id: string, body: UpdateCurrencyDto) {
    const existingCurrency = await this.currencyModel.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!existingCurrency) {
      throw new NotFoundException('Currency not found');
    }

    const existingCurrencyByName = await this.currencyModel.findOne({
      _id: { $ne: id },
      name: body.name,
      isDeleted: false,
    });

    if (existingCurrencyByName) {
      throw new NotFoundException('Currency already exists');
    }

    return await this.currencyModel.findByIdAndUpdate(id, body, {
      returnDocument: 'after',
    });
  }
}
