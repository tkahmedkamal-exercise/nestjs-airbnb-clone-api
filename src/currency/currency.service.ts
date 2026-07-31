import { Injectable } from '@nestjs/common';
import { CreateCurrencyUseCase } from './use-cases/create-currency.usecase';
import { CreateCurrencyDto } from './dtos/create-currency.dto';
import { GetCurrencyByIdUseCase } from './use-cases/get-currency-by-id.usecase';
import { FindAllCurrenciesUseCase } from './use-cases/find-all-currencies.usecase';
import { SoftDeleteCurrencyUseCase } from './use-cases/soft-delete-currency.usecase';
import { UpdateCurrencyDto } from './dtos/update-currency.dto';
import { UpdateCurrencyUseCase } from './use-cases/update-currency.usecase';
import { FindAllQueryDto } from './dtos/find-all-query.dto';

@Injectable()
export class CurrencyService {
  constructor(
    private readonly createCurrencyUseCase: CreateCurrencyUseCase,
    private readonly getCurrencyByIdUseCase: GetCurrencyByIdUseCase,
    private readonly findAllCountriesUseCase: FindAllCurrenciesUseCase,
    private readonly softDeleteCurrencyUseCase: SoftDeleteCurrencyUseCase,
    private readonly updateCurrencyUseCase: UpdateCurrencyUseCase,
  ) {}

  async create(body: CreateCurrencyDto) {
    return await this.createCurrencyUseCase.execute(body);
  }

  async getCurrencyById(id: string) {
    return await this.getCurrencyByIdUseCase.execute(id);
  }

  async findAllCountries(query?: FindAllQueryDto) {
    return await this.findAllCountriesUseCase.execute(query);
  }

  async deleteById(id: string) {
    return await this.softDeleteCurrencyUseCase.execute(id);
  }

  async update(id: string, body: UpdateCurrencyDto) {
    return await this.updateCurrencyUseCase.execute(id, body);
  }
}
