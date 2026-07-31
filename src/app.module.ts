import { Module } from '@nestjs/common';
import { CoreModule } from './core.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CountryModule } from './country/country.module';
import { CitiesModule } from './cities/cities.module';

@Module({
  imports: [CoreModule, UsersModule, AuthModule, CountryModule, CitiesModule],
})
export class AppModule {}
