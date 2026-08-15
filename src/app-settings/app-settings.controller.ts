import { Body, Controller, Get, Put } from '@nestjs/common';
import { AppSettingsService } from './app-settings.service';
import { UpsertAppSettingsDto } from './dtos/upsert-app-settings.dto';
import { Serialize } from '../interceptor/serialize.interceptor';
import { AppSettingsResponseDto } from './dtos/app-settings-response.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Roles as RolesEnum } from '../common/constants';

@Controller('app-settings')
export class AppSettingsController {
  constructor(private readonly appSettingsService: AppSettingsService) {}

  @Roles(RolesEnum.ADMIN)
  @Put()
  @Serialize(AppSettingsResponseDto)
  upsert(@Body() body: UpsertAppSettingsDto) {
    return this.appSettingsService.upsert(body);
  }

  @Get()
  @Serialize(AppSettingsResponseDto)
  find() {
    return this.appSettingsService.find();
  }
}
