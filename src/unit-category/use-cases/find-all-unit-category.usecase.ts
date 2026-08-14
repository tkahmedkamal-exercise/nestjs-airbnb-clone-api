import { Injectable } from '@nestjs/common';
import { FindAllQueryDto } from '../dtos/find-all-query.dto';
import { UnitCategoryRepository } from '../repository/unit-category.repository';

@Injectable()
export class FindAllUnitCategoryUseCase {
  constructor(
    private readonly unitCategoryRepository: UnitCategoryRepository,
  ) {}

  async execute(query?: FindAllQueryDto) {
    const filter = {
      isDeleted: false,
      name: {
        $regex: query?.name ?? '',
        $options: 'i',
      },
    };

    const { data, ...rest } = await this.unitCategoryRepository.findPaginated(
      filter,
      {
        page: query?.page,
        limit: query?.limit,
        ignoreLimit: query?.ignoreLimit,
      },
    );

    return {
      data,
      ...rest,
    };
  }
}
