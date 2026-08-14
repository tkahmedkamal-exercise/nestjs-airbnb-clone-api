import { Injectable } from '@nestjs/common';
import { AppSettingsRepository } from '../repositories/app-settings.repository';

@Injectable()
export class FindAppSettingsUseCase {
  constructor(private readonly appSettingsRepository: AppSettingsRepository) {}

  async execute() {
    return await this.appSettingsRepository.findOne({});
  }
}
