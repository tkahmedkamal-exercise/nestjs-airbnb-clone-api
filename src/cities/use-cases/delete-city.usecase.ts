import { CityRepository } from '../repository/city.repository';
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '../../common/error-handling/custom-exceptions/not-found.exception';

@Injectable()
export class DeleteCityUseCase {
  constructor(private readonly cityRepository: CityRepository) {}

  async execute(id: string) {
    const city = await this.cityRepository.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!city) {
      throw new NotFoundException('City not found');
    }

    return await this.cityRepository.findByIdAndDelete(id);
  }
}
