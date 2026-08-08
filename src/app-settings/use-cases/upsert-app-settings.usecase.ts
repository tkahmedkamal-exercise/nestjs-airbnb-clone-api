import { Injectable } from '@nestjs/common';
import { AppSettingsRepository } from '../repositories/app-settings.repository';
import { UpsertAppSettingsDto } from '../dtos/upsert-app-settings.dto';

@Injectable()
export class UpsertAppSettingsUseCase {
  constructor(private readonly appSettingsRepository: AppSettingsRepository) {}

  async execute(body: UpsertAppSettingsDto) {
    return await this.appSettingsRepository.findOneAndUpdate({}, body, {
      upsert: true,
      returnDocument: 'after',
    });
  }
}
