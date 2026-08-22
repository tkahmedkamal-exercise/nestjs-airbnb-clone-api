import { Module } from '@nestjs/common';
import { CoreModule } from './core.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CountryModule } from './country/country.module';
import { CitiesModule } from './cities/cities.module';
import { CurrencyModule } from './currency/currency.module';
import { UnitCategoryModule } from './unit-category/unit-category.module';
import { AppSettingsModule } from './app-settings/app-settings.module';
import { AdminsModule } from './admins/admins.module';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { AuthorizationGuard } from './auth/guard/authorization.guard';
import { UnitsModule } from './units/units.module';

@Module({
  imports: [
    CoreModule,
    UsersModule,
    AuthModule,
    CountryModule,
    CitiesModule,
    CurrencyModule,
    UnitCategoryModule,
    AppSettingsModule,
    AdminsModule,
    UnitsModule,
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
    {
      provide: 'APP_GUARD',
      useClass: AuthorizationGuard,
    },
  ],
})
export class AppModule {}
