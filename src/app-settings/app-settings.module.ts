import { Module } from '@nestjs/common';
import { AppSettingsController } from './app-settings.controller';
import { AppSettingsService } from './app-settings.service';
import { AppSettingsRepository } from './repositories/app-settings.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { MODEL_NAMES } from '../common/data-access';
import { appSettingsSchema } from './schemas/app-settings.schema';
import { UpsertAppSettingsUseCase } from './use-cases/upsert-app-settings.usecase';
import { FindAppSettingsUseCase } from './use-cases/find-app-settings.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MODEL_NAMES.APP_SETTINGS, schema: appSettingsSchema },
    ]),
  ],
  controllers: [AppSettingsController],
  providers: [
    AppSettingsService,
    AppSettingsRepository,
    UpsertAppSettingsUseCase,
    FindAppSettingsUseCase,
  ],
  exports: [AppSettingsService],
})
export class AppSettingsModule {}
