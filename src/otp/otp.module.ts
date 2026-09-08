import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { SendOtpUseCase } from './usecases/send-otp.usecase';
import { MongooseModule } from '@nestjs/mongoose';
import { MODEL_NAMES } from '../common/data-access';
import { otpSchema } from './schemas/otp.schema';
import { VerifyOtpUseCase } from './usecases/verify-otp.usecase';
import { UsersModule } from '../users/users.module';
import { MailModule } from '../mail/mail.module';
import { OtpRepository } from './repository/otp.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MODEL_NAMES.OTP, schema: otpSchema }]),
    UsersModule,
    MailModule,
  ],
  controllers: [OtpController],
  providers: [OtpRepository, OtpService, SendOtpUseCase, VerifyOtpUseCase],
  exports: [OtpRepository, OtpService, SendOtpUseCase, VerifyOtpUseCase],
})
export class OtpModule {}
