import { Injectable } from '@nestjs/common';
import { FindAllQueryDto } from '../dtos/find-all-query.dto';
import { CurrencyRepository } from '../repository/currency.repository';

@Injectable()
export class FindAllCurrenciesUseCase {
  constructor(private readonly currencyRepository: CurrencyRepository) {}

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

    const { data, ...rest } = await this.currencyRepository.findPaginated(
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
