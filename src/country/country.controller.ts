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
import { CountryService } from './country.service';
import { Serialize } from '../interceptor/serialize.interceptor';
import { CountryResponseDto } from './dtos/country-response.dto';
import { CreateCountryDto } from './dtos/create-country.dto';
import { CountryParamDto } from './dtos/country-param.dto';
import { UpdateCountryDto } from './dtos/update-country.dto';
import { FindAllQueryDto } from './dtos/find-all-query.dto';
import { FindAllDto } from './dtos/find-all.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Roles as RolesEnum } from '../common/constants';
import { Public } from '../auth/decorators/public.decorator';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Roles(RolesEnum.ADMIN)
  @Post()
  @Serialize(CountryResponseDto)
  async create(@Body() body: CreateCountryDto) {
    return await this.countryService.create(body);
  }

  @Public()
  @Get('/:id')
  @Serialize(CountryResponseDto)
  async getCountryById(@Param() { id }: CountryParamDto) {
    return await this.countryService.getCountryById(id);
  }

  @Public()
  @Get()
  @Serialize(FindAllDto)
  async findAllCountries(@Query() query: FindAllQueryDto) {
    return await this.countryService.findAllCountries(query);
  }

  @Roles(RolesEnum.ADMIN)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param() { id }: CountryParamDto) {
    return await this.countryService.deleteById(id);
  }

  @Roles(RolesEnum.ADMIN)
  @Patch('/:id')
  @Serialize(CountryResponseDto)
  async update(
    @Param() { id }: CountryParamDto,
    @Body() body: UpdateCountryDto,
  ) {
    return await this.countryService.update(id, body);
  }
}
