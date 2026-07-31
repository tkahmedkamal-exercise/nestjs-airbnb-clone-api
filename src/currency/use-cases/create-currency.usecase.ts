import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Currency } from '../schemas/currency.schema';
import { Model } from 'mongoose';
import { CreateCurrencyDto } from '../dtos/create-currency.dto';
import { BadRequestException } from '../../common/error-handling/custom-exceptions/bad-request.exception';
import { MODEL_NAMES } from '../../common/data-access';

@Injectable()
export class CreateCurrencyUseCase {
  constructor(
    @InjectModel(MODEL_NAMES.CURRENCIES)
    private readonly currencyModel: Model<Currency>,
  ) {}

  async execute(body: CreateCurrencyDto) {
    const existingCurrency = await this.currencyModel
      .findOne({
        name: body.name,
        isDeleted: false,
      })
      .lean();

    if (existingCurrency) {
      throw new BadRequestException('Currency already exists');
    }

    return await this.currencyModel.create(body);
  }
}
