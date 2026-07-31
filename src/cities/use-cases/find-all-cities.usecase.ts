import { CityRepository } from '../repository/city.repository';
import { Injectable } from '@nestjs/common';
import { QueryFilter } from 'mongoose';
import { City } from '../schemas/city.schema';
import { FindAllQueryDto } from '../dtos/find-all-query.dto';

@Injectable()
export class FindAllCitiesUseCase {
  constructor(private readonly cityRepository: CityRepository) {}

  async execute(query: FindAllQueryDto) {
    const filters: QueryFilter<City> = {
      isDeleted: false,
      name: {
        $regex: query.name ?? '',
        $options: 'i',
      },
    };

    if (query.country) {
      filters['country'] = query.country;
    }

    const { data, ...rest } = await this.cityRepository.findPaginated(filters, {
      page: query.page,
      limit: query.limit,
      ignoreLimit: query.ignoreLimit,
      populate: { path: 'country', select: 'name code' },
    });

    return {
      data,
      ...rest,
    };
  }
}
