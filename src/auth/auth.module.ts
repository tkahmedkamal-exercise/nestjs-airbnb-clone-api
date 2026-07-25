import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Environment } from '../common/config/env.interface';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService<Environment>) => ({
        global: true,
        secret: configService.getOrThrow('jwtSecret'),
        signOptions: {
          expiresIn: configService.getOrThrow('accessTokenExpiresIn'),
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
