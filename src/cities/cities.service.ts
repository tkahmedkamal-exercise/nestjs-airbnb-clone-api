import { Injectable } from '@nestjs/common';
import { CreateCityUseCase } from './use-cases/create-city.usecase';
import { CreateCityDto } from './dtos/create-city.dto';
import { FindAllQueryDto } from './dtos/find-all-query.dto';
import { FindAllCitiesUseCase } from './use-cases/find-all-cities.usecase';
import { UpdateCityDto } from './dtos/update-city.dto';
import { UpdateCityUseCase } from './use-cases/update-city.usecase';
import { FindCityByIdUseCase } from './use-cases/find-city-by-id.usecase';
import { SoftDeleteCityUseCase } from './use-cases/soft-delete-city.usecase';
import { DeleteCityUseCase } from './use-cases/delete-city.usecase';

@Injectable()
export class CitiesService {
  constructor(
    private readonly createCityUseCase: CreateCityUseCase,
    private readonly findAllCitiesUseCase: FindAllCitiesUseCase,
    private readonly updateCityUseCase: UpdateCityUseCase,
    private readonly findCityByIdUseCase: FindCityByIdUseCase,
    private readonly softDeleteCityUseCase: SoftDeleteCityUseCase,
    private readonly deleteCityUseCase: DeleteCityUseCase,
  ) {}

  async create(body: CreateCityDto) {
    return await this.createCityUseCase.execute(body);
  }

  async findAll(query: FindAllQueryDto) {
    return await this.findAllCitiesUseCase.execute(query);
  }

  async findOne(id: string) {
    return await this.findCityByIdUseCase.execute(id);
  }

  async update(id: string, body: UpdateCityDto) {
    return await this.updateCityUseCase.execute(id, body);
  }

  async softDelete(id: string) {
    return await this.softDeleteCityUseCase.execute(id);
  }

  async delete(id: string) {
    return await this.deleteCityUseCase.execute(id);
  }
}
