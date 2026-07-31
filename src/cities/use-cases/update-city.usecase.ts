import { CityRepository } from '../repository/city.repository';
import { BadRequestException } from '../../common/error-handling/custom-exceptions/bad-request.exception';
import { Injectable } from '@nestjs/common';
import { CountryService } from '../../country/country.service';
import { UpdateCityDto } from '../dtos/update-city.dto';
import { NotFoundException } from '../../common/error-handling/custom-exceptions/not-found.exception';

@Injectable()
export class UpdateCityUseCase {
  constructor(
    private readonly cityRepository: CityRepository,
    private readonly countryService: CountryService,
  ) {}

  async execute(id: string, body: UpdateCityDto) {
    const city = await this.cityRepository.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!city) {
      throw new NotFoundException('City not found');
    }

    const existingCityByName = await this.cityRepository.findOne({
      _id: { $ne: id },
      name: body.name,
      country: city.country,
      isDeleted: false,
    });

    if (existingCityByName) {
      throw new BadRequestException('City already exists');
    }

    return await this.cityRepository.findByIdAndUpdate(id, body);
  }
}
