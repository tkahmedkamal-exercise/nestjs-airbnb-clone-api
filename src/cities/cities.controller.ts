import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dtos/create-city.dto';
import { CityResponseDto } from './dtos/city-response.dto';
import { FindAllQueryDto } from './dtos/find-all-query.dto';
import { Serialize } from '../interceptor/serialize.interceptor';
import { FindAllCitiesDto } from './dtos/find-all-cities.dto';
import { CityParamDto } from './dtos/city-param.dto';
import { UpdateCityDto } from './dtos/update-city.dto';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  @Serialize(CityResponseDto)
  async create(@Body() body: CreateCityDto) {
    return this.citiesService.create(body);
  }

  @Patch('/:id')
  @Serialize(CityResponseDto)
  update(@Param() param: CityParamDto, @Body() body: UpdateCityDto) {
    return this.citiesService.update(param.id, body);
  }

  @Get()
  @Serialize(FindAllCitiesDto)
  findAll(@Query() query: FindAllQueryDto) {
    return this.citiesService.findAll(query);
  }

  @Get('/:id')
  @Serialize(CityResponseDto)
  findOne(@Param() param: CityParamDto) {
    return this.citiesService.findOne(param.id);
  }

  @Patch('/soft-delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  softDelete(@Param() param: CityParamDto) {
    return this.citiesService.softDelete(param.id);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() param: CityParamDto) {
    return this.citiesService.delete(param.id);
  }
}
