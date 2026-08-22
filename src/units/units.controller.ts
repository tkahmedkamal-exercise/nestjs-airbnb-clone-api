import type { CurrentUserType } from '../auth/guard/jwt-auth.guard';
import { Body, Controller, Post } from '@nestjs/common';
import { UnitsService } from './units.service';
import { CreateUnitDto } from './dtos/create-unit.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Serialize } from '../interceptor/serialize.interceptor';
import { UnitResponseDto } from './dtos/unit-response.dto';

@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Post()
  @Serialize(UnitResponseDto)
  create(
    @Body() body: CreateUnitDto,
    @CurrentUser() currentUser: CurrentUserType,
  ) {
    return this.unitsService.create(body, currentUser);
  }
}
