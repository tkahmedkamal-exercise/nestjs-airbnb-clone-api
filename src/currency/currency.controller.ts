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
import { CurrencyService } from './currency.service';
import { Serialize } from '../interceptor/serialize.interceptor';
import { CreateCurrencyDto } from './dtos/create-currency.dto';
import { CurrencyParamDto } from './dtos/currency-param.dto';
import { UpdateCurrencyDto } from './dtos/update-currency.dto';
import { FindAllQueryDto } from './dtos/find-all-query.dto';
import { FindAllDto } from './dtos/find-all.dto';
import { CurrencyResponseDto } from './dtos/currency-response.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Roles as RolesEnum } from '../common/constants';
import { Public } from '../auth/decorators/public.decorator';

@Controller('currencies')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Roles(RolesEnum.ADMIN)
  @Post()
  @Serialize(CurrencyResponseDto)
  async create(@Body() body: CreateCurrencyDto) {
    return await this.currencyService.create(body);
  }

  @Public()
  @Get('/:id')
  @Serialize(CurrencyResponseDto)
  async getCurrencyById(@Param() param: CurrencyParamDto) {
    return await this.currencyService.getCurrencyById(param?.id);
  }

  @Public()
  @Get()
  @Serialize(FindAllDto)
  async findAllCountries(@Query() query: FindAllQueryDto) {
    return await this.currencyService.findAllCountries(query);
  }

  @Roles(RolesEnum.ADMIN)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param() { id }: CurrencyParamDto) {
    return await this.currencyService.deleteById(id);
  }

  @Roles(RolesEnum.ADMIN)
  @Patch('/:id')
  @Serialize(CurrencyResponseDto)
  async update(
    @Param() { id }: CurrencyParamDto,
    @Body() body: UpdateCurrencyDto,
  ) {
    return await this.currencyService.update(id, body);
  }
}
