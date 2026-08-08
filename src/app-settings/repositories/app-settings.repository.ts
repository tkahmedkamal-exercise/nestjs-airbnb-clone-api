import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { BaseRepository, MODEL_NAMES } from '../../common/data-access';
import { AppSettings } from '../schemas/app-settings.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AppSettingsRepository extends BaseRepository<AppSettings> {
  constructor(
    @InjectModel(MODEL_NAMES.APP_SETTINGS)
    private readonly appSettingsModel: Model<AppSettings>,
  ) {
    super(appSettingsModel);
  }
}
