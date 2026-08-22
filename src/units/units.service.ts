import { Injectable } from '@nestjs/common';
import { CreateUnitUseCase } from './use-cases/create-unit.usecase';
import { CreateUnitDto } from './dtos/create-unit.dto';
import { UserDataDto } from '../auth/dtos/user.dto';

@Injectable()
export class UnitsService {
  constructor(private readonly createUnitUseCase: CreateUnitUseCase) {}

  async create(body: CreateUnitDto, currentUser: UserDataDto) {
    return await this.createUnitUseCase.execute(body, currentUser);
  }
}
