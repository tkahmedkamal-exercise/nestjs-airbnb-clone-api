import { Module } from '@nestjs/common';
import { CustomI18nService } from './i18n/custom-i18n.service';
import { CoreModule } from './core.module';

@Module({
  imports: [CoreModule],
  providers: [CustomI18nService],
})
export class AppModule {}
