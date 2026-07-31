import { Injectable } from '@nestjs/common';
import { FindAllQueryDto } from '../dtos/find-all-query.dto';
import { CountryRepository } from '../repository/country.repository';

@Injectable()
export class FindAllCountriesUseCase {
  constructor(private readonly countryRepository: CountryRepository) {}

  async execute(query?: FindAllQueryDto) {
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

    const { data, ...rest } = await this.countryRepository.findPaginated(
      filter,
      {
        page: query?.page,
        limit: query?.limit,
        ignoreLimit: query?.ignoreLimit,
      },
    );

    return {
      data,
      ...rest,
    };
  }
}
