import { Injectable } from '@nestjs/common';
import { CreateCountryUseCase } from './use-cases/create-country.usecase';
import { CreateCountryDto } from './dtos/create-country.dto';
import { GetCountryByIdUseCase } from './use-cases/get-country-by-id.usecase';
import { FindAllCountriesUseCase } from './use-cases/find-all-countries.usecase';
import { SoftDeleteCountryUseCase } from './use-cases/soft-delete-country.usecase';
import { CountryParamDto } from './dtos/country-param.dto';
import { UpdateCountryDto } from './dtos/update-country.dto';
import { UpdateCountryUseCase } from './use-cases/update-country.usecase';
import { FindAllQueryDto } from './dtos/find-all-query.dto';

@Injectable()
export class CountryService {
  constructor(
    private readonly createCountryUseCase: CreateCountryUseCase,
    private readonly getCountryByIdUseCase: GetCountryByIdUseCase,
    private readonly findAllCountriesUseCase: FindAllCountriesUseCase,
    private readonly softDeleteCountryUseCase: SoftDeleteCountryUseCase,
    private readonly updateCountryUseCase: UpdateCountryUseCase,
  ) {}

  async create(body: CreateCountryDto) {
    return await this.createCountryUseCase.execute(body);
  }

  async getCountryById(id: string) {
    return await this.getCountryByIdUseCase.execute(id);
  }

  async findAllCountries(query?: FindAllQueryDto) {
    return await this.findAllCountriesUseCase.execute(query);
  }

  async deleteById(id: string) {
    return await this.softDeleteCountryUseCase.execute(id);
  }

  async update(id: string, body: UpdateCountryDto) {
    return await this.updateCountryUseCase.execute(id, body);
  }
}
