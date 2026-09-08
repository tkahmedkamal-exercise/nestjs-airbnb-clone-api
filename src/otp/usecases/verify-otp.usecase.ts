import { Injectable } from '@nestjs/common';
import { OtpRepository } from '../repository/otp.repository';
import { VerifyOtpDto } from '../dtos/verify-otp.dto';
import { BadRequestException } from '../../common/error-handling/custom-exceptions/bad-request.exception';

@Injectable()
export class VerifyOtpUseCase {
  constructor(readonly otpRepository: OtpRepository) {}

  async execute(body: VerifyOtpDto) {
    await this.validation(body.email, body.otp);
    await this.otpRepository.findOneAndUpdate(
      {
        email: body.email,
      },
      {
        isVerified: true,
      },
    );
  }

  async validation(email: string, code: string) {
    const otp = await this.otpRepository.findOne({ email, code });

    if (!otp) {
      throw new BadRequestException('Invalid OTP');
    }

    if (new Date() > otp.expiresAt) {
      throw new BadRequestException('OTP has expired');
    }

    if (otp.isVerified) {
      throw new BadRequestException('OTP already verified');
    }
  }
}
