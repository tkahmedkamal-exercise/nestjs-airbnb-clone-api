import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country } from '../schemas/country.schema';
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '../../common/error-handling/custom-exceptions/not-found.exception';
import { CountryParamDto } from '../dtos/country-param.dto';
import { MODEL_NAMES } from '../../common/data-access';

@Injectable()
export class SoftDeleteCountryUseCase {
  constructor(
    @InjectModel(MODEL_NAMES.COUNTRIES)
    private readonly countryModel: Model<Country>,
  ) {}

  async execute(id: string) {
    const country = await this.countryModel.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!country) {
      throw new NotFoundException('Country not found');
    }

    await this.countryModel.findByIdAndUpdate(id, {
      isDeleted: true,
      deletedAt: new Date().toISOString(),
    });
  }
}
