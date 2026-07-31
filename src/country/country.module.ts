import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { MongooseModule } from '@nestjs/mongoose';
import { countrySchema } from './schemas/country.schema';
import { CreateCountryUseCase } from './use-cases/create-country.usecase';
import { GetCountryByIdUseCase } from './use-cases/get-country-by-id.usecase';
import { FindAllCountriesUseCase } from './use-cases/find-all-countries.usecase';
import { SoftDeleteCountryUseCase } from './use-cases/soft-delete-country.usecase';
import { UpdateCountryUseCase } from './use-cases/update-country.usecase';
import { MODEL_NAMES } from '../common/data-access';
import { CountryRepository } from './repository/country.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MODEL_NAMES.COUNTRIES, schema: countrySchema },
    ]),
  ],
  controllers: [CountryController],
  providers: [
    CountryService,
    CreateCountryUseCase,
    GetCountryByIdUseCase,
    FindAllCountriesUseCase,
    SoftDeleteCountryUseCase,
    UpdateCountryUseCase,
    CountryRepository,
  ],
  exports: [CountryService],
})
export class CountryModule {}
