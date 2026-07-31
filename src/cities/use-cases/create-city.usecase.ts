import { CityRepository } from '../repository/city.repository';
import { CreateCityDto } from '../dtos/create-city.dto';
import { BadRequestException } from '../../common/error-handling/custom-exceptions/bad-request.exception';
import { Injectable } from '@nestjs/common';
import { CountryService } from '../../country/country.service';

@Injectable()
export class CreateCityUseCase {
  constructor(
    private readonly cityRepository: CityRepository,
    private readonly countryService: CountryService,
  ) {}

  async execute(body: CreateCityDto) {
    const existingCity = await this.cityRepository.findOne({
      name: body.name,
      country: body.country,
      isDeleted: false,
    });

    if (existingCity) {
      throw new BadRequestException('City already exists');
    }

    await this.countryService.getCountryById(body.country);

    return await this.cityRepository.create(body);
  }
}
