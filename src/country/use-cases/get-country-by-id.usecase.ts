import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country } from '../schemas/country.schema';
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '../../common/error-handling/custom-exceptions/not-found.exception';
import { CountryParamDto } from '../dtos/country-param.dto';

@Injectable()
export class GetCountryByIdUseCase {
  constructor(
    @InjectModel(Country.name) private readonly countryModel: Model<Country>,
  ) {}

  async execute(id: string) {
    const country = await this.countryModel
      .findOne({
        _id: id,
        isDeleted: false,
      })
      .lean();

    if (!country) {
      throw new NotFoundException('Country not found');
    }

    return country;
  }
}
