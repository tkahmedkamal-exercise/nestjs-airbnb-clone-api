import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Country } from '../schemas/country.schema';
import { Model } from 'mongoose';
import { FindAllQueryDto } from '../dtos/find-all-query.dto';

@Injectable()
export class FindAllCountriesUseCase {
  constructor(
    @InjectModel(Country.name) private readonly countryModel: Model<Country>,
  ) {}

  async execute(query?: FindAllQueryDto) {
    const page = query?.page || 1;
    const limit = query?.limit || 10;
    const skip = (page - 1) * limit;
    const sort = query?.sort?.toLowerCase() === 'asc' ? 'asc' : 'desc';

    const filter = {
      isDeleted: false,
      name: {
        $regex: query?.name ?? '',
        $options: 'i',
      },
      code: {
        $regex: query?.code ?? '',
        $options: 'i',
      },
    };

    // const totalRecords = await this.countryModel.countDocuments(filter);

    return await this.countryModel
      .find(filter)
      .sort({ createdAt: sort })
      .skip(skip)
      .limit(limit)
      .lean();
  }
}
