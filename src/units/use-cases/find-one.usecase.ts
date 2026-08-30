import { Injectable } from '@nestjs/common';
import { QueryFilter } from 'mongoose';
import { Unit } from '../schemas/unit.schema';
import { UnitResponseDto } from '../dtos/unit-response.dto';
import { plainToInstance } from 'class-transformer';
import { UnitRepository } from '../repository/unit.repository';
import { NotFoundException } from '../../common/error-handling/custom-exceptions/not-found.exception';

@Injectable()
export class FindOneUseCase {
  constructor(private readonly unitRepository: UnitRepository) {}

  async execute(query: QueryFilter<Unit>) {
    const unit = await this.unitRepository.findOne(query);
    if (!unit) {
      throw new NotFoundException('Unit not found');
    }

    return unit;
  }
}
