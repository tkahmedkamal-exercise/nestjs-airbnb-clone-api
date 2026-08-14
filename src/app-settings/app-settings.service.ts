import { Injectable } from '@nestjs/common';
import { UpsertAppSettingsUseCase } from './use-cases/upsert-app-settings.usecase';
import { UpsertAppSettingsDto } from './dtos/upsert-app-settings.dto';
import { FindAppSettingsUseCase } from './use-cases/find-app-settings.usecase';

@Injectable()
export class AppSettingsService {
  constructor(
    private readonly upsertAppSettingsUseCase: UpsertAppSettingsUseCase,
    private readonly findAppSettingsUseCase: FindAppSettingsUseCase,
  ) {}

  async upsert(body: UpsertAppSettingsDto) {
    return this.upsertAppSettingsUseCase.execute(body);
  }

  async find() {
    return this.findAppSettingsUseCase.execute();
  }
}
