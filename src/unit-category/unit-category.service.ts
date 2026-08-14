import { Injectable } from '@nestjs/common';
import { CreateUnitCategoryUseCase } from './use-cases/create-unit-category.usecase';
import { CreateUnitCategoryDto } from './dtos/create-unit-category.dto';
import { GetUnitCategoryByIdUseCase } from './use-cases/get-unit-category-by-id.usecase';
import { FindAllUnitCategoryUseCase } from './use-cases/find-all-unit-category.usecase';
import { SoftDeleteUnitCategoryUseCase } from './use-cases/soft-delete-unit-category.usecase';
import { UpdateUnitCategoryDto } from './dtos/update-unit-category.dto';
import { UpdateUnitCategoryUseCase } from './use-cases/update-unit-category.usecase';
import { FindAllQueryDto } from './dtos/find-all-query.dto';

@Injectable()
export class UnitCategoryService {
  constructor(
    private readonly createUnitCategoryUseCase: CreateUnitCategoryUseCase,
    private readonly getUnitCategoryByIdUseCase: GetUnitCategoryByIdUseCase,
    private readonly findAllUnitCategoriesUseCase: FindAllUnitCategoryUseCase,
    private readonly softDeleteUnitCategoryUseCase: SoftDeleteUnitCategoryUseCase,
    private readonly updateUnitCategoryUseCase: UpdateUnitCategoryUseCase,
  ) {}

  async create(body: CreateUnitCategoryDto) {
    return await this.createUnitCategoryUseCase.execute(body);
  }

  async getUnitCategoryById(id: string) {
    return await this.getUnitCategoryByIdUseCase.execute(id);
  }

  async findAllUnitCategories(query?: FindAllQueryDto) {
    return await this.findAllUnitCategoriesUseCase.execute(query);
  }

  async deleteById(id: string) {
    return await this.softDeleteUnitCategoryUseCase.execute(id);
  }

  async update(id: string, body: UpdateUnitCategoryDto) {
    return await this.updateUnitCategoryUseCase.execute(id, body);
  }
}
