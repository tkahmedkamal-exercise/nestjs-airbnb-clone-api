import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UnitCategory } from '../schemas/unit-category.schema';
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '../../common/error-handling/custom-exceptions/not-found.exception';
import { MODEL_NAMES } from '../../common/data-access';

@Injectable()
export class SoftDeleteUnitCategoryUseCase {
  constructor(
    @InjectModel(MODEL_NAMES.UNIT_CATEGORY)
    private readonly unitCategoryModel: Model<UnitCategory>,
  ) {}

  async execute(id: string) {
    const unitCategory = await this.unitCategoryModel.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!unitCategory) {
      throw new NotFoundException('Unit Category not found');
    }

    await this.unitCategoryModel.findByIdAndUpdate(id, {
      isDeleted: true,
      deletedAt: new Date().toISOString(),
    });
  }
}
