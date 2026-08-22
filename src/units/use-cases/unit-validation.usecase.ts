import { Injectable } from '@nestjs/common';
import { AppSettingsService } from '../../app-settings/app-settings.service';
import { CitiesService } from '../../cities/cities.service';
import { CreateUnitDto } from '../dtos/create-unit.dto';
import { CountryService } from '../../country/country.service';
import { UnitCategoryService } from '../../unit-category/unit-category.service';
import { UpdateUnitDto } from '../dtos/update-unit.dto';
import { BadRequestException } from '../../common/error-handling/custom-exceptions/bad-request.exception';

@Injectable()
export class UnitValidationUseCase {
  constructor(
    private readonly appSettingsService: AppSettingsService,
    private readonly citiesService: CitiesService,
    private readonly countriesService: CountryService,
    private readonly unitCategoriesService: UnitCategoryService,
  ) {}

  async execute(body: CreateUnitDto | UpdateUnitDto) {
    const appSettings = await this.appSettingsService.find();

    if (body?.costPerDay! < appSettings?.minPrice!)
      throw new BadRequestException(
        `Cost per can not be less than min price: ${appSettings?.minPrice}`,
      );

    if (body?.city) {
      const city = await this.citiesService.findOne(body.city);
      if (!city) {
        throw new BadRequestException('City not found');
      }
    }

    if (body?.country) {
      const country = await this.countriesService.getCountryById(body.country);
      if (!country) {
        throw new BadRequestException('Country not found');
      }
    }

    if (body?.unitCategory) {
      const unitCategory = await this.unitCategoriesService.getUnitCategoryById(
        body.unitCategory,
      );
      if (!unitCategory) {
        throw new BadRequestException('Unit category not found');
      }
    }
  }
}
