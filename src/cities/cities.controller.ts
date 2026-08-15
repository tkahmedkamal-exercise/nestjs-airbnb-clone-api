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
import { Roles } from '../auth/decorators/roles.decorator';
import { Roles as RolesEnum } from '../common/constants';
import { Public } from '../auth/decorators/public.decorator';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Roles(RolesEnum.ADMIN)
  @Post()
  @Serialize(CityResponseDto)
  async create(@Body() body: CreateCityDto) {
    return this.citiesService.create(body);
  }

  @Roles(RolesEnum.ADMIN)
  @Patch('/:id')
  @Serialize(CityResponseDto)
  update(@Param() param: CityParamDto, @Body() body: UpdateCityDto) {
    return this.citiesService.update(param.id, body);
  }

  @Public()
  @Get()
  @Serialize(FindAllCitiesDto)
  findAll(@Query() query: FindAllQueryDto) {
    return this.citiesService.findAll(query);
  }

  @Public()
  @Get('/:id')
  @Serialize(CityResponseDto)
  findOne(@Param() param: CityParamDto) {
    return this.citiesService.findOne(param.id);
  }

  @Roles(RolesEnum.ADMIN)
  @Patch('/soft-delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  softDelete(@Param() param: CityParamDto) {
    return this.citiesService.softDelete(param.id);
  }

  @Roles(RolesEnum.ADMIN)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() param: CityParamDto) {
    return this.citiesService.delete(param.id);
  }
}
