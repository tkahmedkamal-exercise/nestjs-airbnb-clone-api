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
import { UnitCategoryService } from './unit-category.service';
import { Serialize } from '../interceptor/serialize.interceptor';
import { CreateUnitCategoryDto } from './dtos/create-unit-category.dto';
import { UnitCategoryParamDto } from './dtos/unit-category-param.dto';
import { UpdateUnitCategoryDto } from './dtos/update-unit-category.dto';
import { FindAllQueryDto } from './dtos/find-all-query.dto';
import { FindAllDto } from './dtos/find-all.dto';
import { UnitCategoryResponseDto } from './dtos/unit-category-response.dto';

@Controller('unit-category')
export class UnitCategoryController {
  constructor(private readonly unitCategoryService: UnitCategoryService) {}

  @Post()
  @Serialize(UnitCategoryResponseDto)
  async create(@Body() body: CreateUnitCategoryDto) {
    return await this.unitCategoryService.create(body);
  }

  @Get('/:id')
  @Serialize(UnitCategoryResponseDto)
  async getUnitCategoryById(@Param() param: UnitCategoryParamDto) {
    return await this.unitCategoryService.getUnitCategoryById(param?.id);
  }

  @Get()
  @Serialize(FindAllDto)
  async findAllUnitCategories(@Query() query: FindAllQueryDto) {
    return await this.unitCategoryService.findAllUnitCategories(query);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param() { id }: UnitCategoryParamDto) {
    return await this.unitCategoryService.deleteById(id);
  }

  @Patch('/:id')
  @Serialize(UnitCategoryResponseDto)
  async update(
    @Param() { id }: UnitCategoryParamDto,
    @Body() body: UpdateUnitCategoryDto,
  ) {
    return await this.unitCategoryService.update(id, body);
  }
}
