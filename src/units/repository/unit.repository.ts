import { MODEL_NAMES } from './../../common/data-access/model-names.enum';
import { Unit } from './../schemas/unit.schema';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseRepository } from '../../common/data-access';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UnitRepository extends BaseRepository<Unit> {
  constructor(
    @InjectModel(MODEL_NAMES.UNITS) private readonly unitModule: Model<Unit>,
  ) {
    super(unitModule);
  }
}
