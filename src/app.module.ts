import { Module } from '@nestjs/common';
import { CustomI18nService } from './i18n/custom-i18n.service';
import { CoreModule } from './core.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CoreModule, UsersModule, AuthModule],
  providers: [CustomI18nService],
})
export class AppModule {}
