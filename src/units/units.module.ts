import { Module } from '@nestjs/common';
import { UnitsService } from './units.service';
import { UnitsController } from './units.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MODEL_NAMES } from '../common/data-access';
import { unitSchema } from './schemas/unit.schema';
import { UnitRepository } from './repository/unit.repository';
import { UnitValidationUseCase } from './use-cases/unit-validation.usecase';
import { CreateUnitUseCase } from './use-cases/create-unit.usecase';
import { UnitCategoryModule } from '../unit-category/unit-category.module';
import { AppSettingsModule } from '../app-settings/app-settings.module';
import { CitiesModule } from '../cities/cities.module';
import { CountryModule } from '../country/country.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MODEL_NAMES.UNITS, schema: unitSchema },
    ]),
    AppSettingsModule,
    UnitCategoryModule,
    CitiesModule,
    CountryModule,
  ],
  providers: [
    UnitRepository,
    UnitsService,
    UnitValidationUseCase,
    CreateUnitUseCase,
  ],
  controllers: [UnitsController],
  exports: [UnitsService],
})
export class UnitsModule {}
