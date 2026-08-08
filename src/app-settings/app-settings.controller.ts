import { Body, Controller, Put } from '@nestjs/common';
import { AppSettingsService } from './app-settings.service';
import { UpsertAppSettingsDto } from './dtos/upsert-app-settings.dto';
import { Serialize } from '../interceptor/serialize.interceptor';
import { AppSettingsResponseDto } from './dtos/app-settings-response.dto';

@Controller('app-settings')
export class AppSettingsController {
  constructor(private readonly appSettingsService: AppSettingsService) {}

  @Put()
  @Serialize(AppSettingsResponseDto)
  upsert(@Body() body: UpsertAppSettingsDto) {
    return this.appSettingsService.upsert(body);
  }
}
