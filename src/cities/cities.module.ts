import { Module } from '@nestjs/common';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { CityRepository } from './repository/city.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { MODEL_NAMES } from '../common/data-access';
import { citySchema } from './schemas/city.schema';
import { CountryModule } from '../country/country.module';
import { CreateCityUseCase } from './use-cases/create-city.usecase';
import { FindAllCitiesUseCase } from './use-cases/find-all-cities.usecase';
import { UpdateCityUseCase } from './use-cases/update-city.usecase';
import { FindCityByIdUseCase } from './use-cases/find-city-by-id.usecase';
import { SoftDeleteCityUseCase } from './use-cases/soft-delete-city.usecase';
import { DeleteCityUseCase } from './use-cases/delete-city.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MODEL_NAMES.CITIES, schema: citySchema },
    ]),
    CountryModule,
  ],
  controllers: [CitiesController],
  providers: [
    CitiesService,
    CityRepository,
    CreateCityUseCase,
    FindAllCitiesUseCase,
    UpdateCityUseCase,
    FindCityByIdUseCase,
    SoftDeleteCityUseCase,
    DeleteCityUseCase,
  ],
  exports: [CitiesService],
})
export class CitiesModule {}
