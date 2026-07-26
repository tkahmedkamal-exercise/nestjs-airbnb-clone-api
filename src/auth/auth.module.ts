import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Environment } from '../common/config/env.interface';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RefreshToken,
  RefreshTokenSchema,
} from './schemas/refresh-token.schema';
import { GenerateTokensUseCase } from './use-cases/generate-tokens.usecase';
import { RegisterUseCase } from './use-cases/register.usecase';
import { LoginUseCase } from './use-cases/login';
import { RefreshTokenUseCase } from './use-cases/refresh-token.usecase';

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
    MongooseModule.forFeature([
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GenerateTokensUseCase,
    RegisterUseCase,
    LoginUseCase,
    RefreshTokenUseCase,
  ],
})
export class AuthModule {}
