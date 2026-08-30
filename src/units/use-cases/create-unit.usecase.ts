import { Injectable } from '@nestjs/common';
import { CreateUnitDto } from '../dtos/create-unit.dto';
import { UnitRepository } from '../repository/unit.repository';
import { UnitValidationUseCase } from './unit-validation.usecase';
import { UserDataDto } from '../../auth/dtos/user.dto';
import { CurrentUserType } from '../../auth/guard/jwt-auth.guard';

@Injectable()
export class CreateUnitUseCase {
  constructor(
    private readonly unitsRepository: UnitRepository,
    private readonly unitValidationUseCase: UnitValidationUseCase,
  ) {}

  async execute(body: CreateUnitDto, currentUser: CurrentUserType) {
    await this.unitValidationUseCase.execute(body);

    return await this.unitsRepository.create({
      ...body,
      user: currentUser.id,
    });
  }
}
