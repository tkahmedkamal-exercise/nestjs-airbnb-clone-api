import { Module } from '@nestjs/common';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';
import { MongooseModule } from '@nestjs/mongoose';
import { currencySchema } from './schemas/currency.schema';
import { GetCurrencyByIdUseCase } from './use-cases/get-currency-by-id.usecase';
import { FindAllCurrenciesUseCase } from './use-cases/find-all-currencies.usecase';
import { SoftDeleteCurrencyUseCase } from './use-cases/soft-delete-currency.usecase';
import { UpdateCurrencyUseCase } from './use-cases/update-currency.usecase';
import { MODEL_NAMES } from '../common/data-access';
import { CurrencyRepository } from './repository/currency.repository';
import { CreateCurrencyUseCase } from './use-cases/create-currency.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MODEL_NAMES.CURRENCIES, schema: currencySchema },
    ]),
  ],
  controllers: [CurrencyController],
  providers: [
    CurrencyService,
    CreateCurrencyUseCase,
    GetCurrencyByIdUseCase,
    FindAllCurrenciesUseCase,
    SoftDeleteCurrencyUseCase,
    UpdateCurrencyUseCase,
    CurrencyRepository,
  ],
  exports: [CurrencyService],
})
export class CurrencyModule {}
