import { Module } from '@nestjs/common';
import { UnitCategoryController } from './unit-category.controller';
import { UnitCategoryService } from './unit-category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { unitCategorySchema } from './schemas/unit-category.schema';
import { GetUnitCategoryByIdUseCase } from './use-cases/get-unit-category-by-id.usecase';
import { FindAllUnitCategoryUseCase } from './use-cases/find-all-unit-category.usecase';
import { SoftDeleteUnitCategoryUseCase } from './use-cases/soft-delete-unit-category.usecase';
import { UpdateUnitCategoryUseCase } from './use-cases/update-unit-category.usecase';
import { MODEL_NAMES } from '../common/data-access';
import { UnitCategoryRepository } from './repository/unit-category.repository';
import { CreateUnitCategoryUseCase } from './use-cases/create-unit-category.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MODEL_NAMES.UNIT_CATEGORY, schema: unitCategorySchema },
    ]),
  ],
  controllers: [UnitCategoryController],
  providers: [
    UnitCategoryService,
    CreateUnitCategoryUseCase,
    GetUnitCategoryByIdUseCase,
    FindAllUnitCategoryUseCase,
    SoftDeleteUnitCategoryUseCase,
    UpdateUnitCategoryUseCase,
    UnitCategoryRepository,
  ],
  exports: [UnitCategoryService],
})
export class UnitCategoryModule {}
