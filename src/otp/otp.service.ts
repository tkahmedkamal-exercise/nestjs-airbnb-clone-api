import { Injectable } from '@nestjs/common';
import { SendOtpUseCase } from './usecases/send-otp.usecase';
import { SendOtpDto } from './dtos/send-otp.dto';
import { VerifyOtpDto } from './dtos/verify-otp.dto';
import { VerifyOtpUseCase } from './usecases/verify-otp.usecase';

@Injectable()
export class OtpService {
  constructor(
    private readonly sendOtpUseCase: SendOtpUseCase,
    private readonly verifyOtpUseCase: VerifyOtpUseCase,
  ) {}

  send(body: SendOtpDto) {
    return this.sendOtpUseCase.execute(body);
  }

  verify(body: VerifyOtpDto) {
    return this.verifyOtpUseCase.execute(body);
  }
}
