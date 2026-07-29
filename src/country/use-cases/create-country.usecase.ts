import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Country } from '../schemas/country.schema';
import { Model } from 'mongoose';
import { CreateCountryDto } from '../dtos/create-country.dto';
import { BadRequestException } from '../../common/error-handling/custom-exceptions/bad-request.exception';

@Injectable()
export class CreateCountryUseCase {
  constructor(
    @InjectModel(Country.name) private readonly countryModel: Model<Country>,
  ) {}

  async execute(body: CreateCountryDto) {
    const existingCountry = await this.countryModel
      .findOne({
        name: body.name,
        isDeleted: false,
      })
      .lean();

    if (existingCountry) {
      throw new BadRequestException('Country already exists');
    }

    const country = await this.countryModel.create(body);

    return country;
  }
}
