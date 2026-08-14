import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UnitCategory } from '../schemas/unit-category.schema';
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '../../common/error-handling/custom-exceptions/not-found.exception';
import { UpdateUnitCategoryDto } from '../dtos/update-unit-category.dto';
import { MODEL_NAMES } from '../../common/data-access';

@Injectable()
export class UpdateUnitCategoryUseCase {
  constructor(
    @InjectModel(MODEL_NAMES.UNIT_CATEGORY)
    private readonly unitCategoryModel: Model<UnitCategory>,
  ) {}

  async execute(id: string, body: UpdateUnitCategoryDto) {
    const existingUnitCategory = await this.unitCategoryModel.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!existingUnitCategory) {
      throw new NotFoundException('Unit Category not found');
    }

    const existingUnitCategoryByName = await this.unitCategoryModel.findOne({
      _id: { $ne: id },
      name: body.name,
      isDeleted: false,
    });

    if (existingUnitCategoryByName) {
      throw new NotFoundException('Unit Category already exists');
    }

    return await this.unitCategoryModel.findByIdAndUpdate(id, body, {
      returnDocument: 'after',
    });
  }
}
