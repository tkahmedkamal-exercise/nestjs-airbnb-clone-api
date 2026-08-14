import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UnitCategory } from '../schemas/unit-category.schema';
import { Model } from 'mongoose';
import { CreateUnitCategoryDto } from '../dtos/create-unit-category.dto';
import { BadRequestException } from '../../common/error-handling/custom-exceptions/bad-request.exception';
import { MODEL_NAMES } from '../../common/data-access';

@Injectable()
export class CreateUnitCategoryUseCase {
  constructor(
    @InjectModel(MODEL_NAMES.UNIT_CATEGORY)
    private readonly unitCategoryModel: Model<UnitCategory>,
  ) {}

  async execute(body: CreateUnitCategoryDto) {
    const existingUnitCategory = await this.unitCategoryModel
      .findOne({
        name: body.name,
        isDeleted: false,
      })
      .lean();

    if (existingUnitCategory) {
      throw new BadRequestException('Unit Category already exists');
    }

    return await this.unitCategoryModel.create(body);
  }
}
