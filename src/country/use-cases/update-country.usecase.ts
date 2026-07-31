import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country } from '../schemas/country.schema';
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '../../common/error-handling/custom-exceptions/not-found.exception';
import { UpdateCountryDto } from '../dtos/update-country.dto';
import { MODEL_NAMES } from '../../common/data-access';

@Injectable()
export class UpdateCountryUseCase {
  constructor(
    @InjectModel(MODEL_NAMES.COUNTRIES)
    private readonly countryModel: Model<Country>,
  ) {}

  async execute(id: string, body: UpdateCountryDto) {
    const existingCountry = await this.countryModel.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!existingCountry) {
      throw new NotFoundException('Country not found');
    }

    const existingCountryByName = await this.countryModel.findOne({
      _id: { $ne: id },
      name: body.name,
      isDeleted: false,
    });

    if (existingCountryByName) {
      throw new NotFoundException('Country already exists');
    }

    const updatedCountry = await this.countryModel.findByIdAndUpdate(id, body, {
      returnDocument: 'after',
    });

    return updatedCountry;
  }
}
