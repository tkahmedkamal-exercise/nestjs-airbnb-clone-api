import { Injectable } from '@nestjs/common';
import { UpsertAppSettingsUseCase } from './use-cases/upsert-app-settings.usecase';
import { UpsertAppSettingsDto } from './dtos/upsert-app-settings.dto';

@Injectable()
export class AppSettingsService {
  constructor(
    private readonly upsertAppSettingsUseCase: UpsertAppSettingsUseCase,
  ) {}

  async upsert(body: UpsertAppSettingsDto) {
    return this.upsertAppSettingsUseCase.execute(body);
  }
}
