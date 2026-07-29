import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, countrySchema } from './schemas/country.schema';
import { CreateCountryUseCase } from './use-cases/create-country.usecase';
import { GetCountryByIdUseCase } from './use-cases/get-country-by-id.usecase';
import { FindAllCountriesUseCase } from './use-cases/find-all-countries.usecase';
import { SoftDeleteCountryUseCase } from './use-cases/soft-delete-country.usecase';
import { UpdateCountryUseCase } from './use-cases/update-country.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Country.name, schema: countrySchema }]),
  ],
  controllers: [CountryController],
  providers: [
    CountryService,
    CreateCountryUseCase,
    GetCountryByIdUseCase,
    FindAllCountriesUseCase,
    SoftDeleteCountryUseCase,
    UpdateCountryUseCase,
  ],
})
export class CountryModule {}
