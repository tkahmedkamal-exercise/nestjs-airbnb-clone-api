import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UnitCategory } from '../schemas/unit-category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository, MODEL_NAMES } from '../../common/data-access';

@Injectable()
export class UnitCategoryRepository extends BaseRepository<UnitCategory> {
  constructor(
    @InjectModel(MODEL_NAMES.UNIT_CATEGORY)
    private readonly unitCategoryModel: Model<UnitCategory>,
  ) {
    super(unitCategoryModel);
  }
}
