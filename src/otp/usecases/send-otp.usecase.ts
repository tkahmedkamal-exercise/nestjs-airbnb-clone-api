import { Injectable } from '@nestjs/common';
import { OtpRepository } from '../repository/otp.repository';
import { SendOtpDto } from '../dtos/send-otp.dto';
import { UsersService } from '../../users/users.service';
import { BadRequestException } from '../../common/error-handling/custom-exceptions/bad-request.exception';
import { MailService } from '../../mail/mail.service';
import { randomInt } from 'node:crypto';

@Injectable()
export class SendOtpUseCase {
  constructor(
    private readonly otpRepository: OtpRepository,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
  ) {}

  async execute(body: SendOtpDto) {
    // 1. Check if the email already verified and there's user with this email
    await this.validateBeforeSendOtp(body.email);

    // 2. Generate 6 digit OTP, save it to the db
    const otp = this.generateOtp();
    await this.saveOtpToDB(body.email, otp);

    // 3. Send the OTP to the email
    await this.mailService.sendMail({
      to: body.email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
    });
  }

  private async validateBeforeSendOtp(email: string) {
    const otpVerified = await this.otpRepository.findOne({
      email,
      isVerified: true,
    });

    if (otpVerified) {
      const existingEmail = await this.usersService.findOne({ email });

      if (existingEmail) {
        throw new BadRequestException('Email already verified and registered');
      }
    }
  }

  private generateOtp() {
    return randomInt(100000, 1_000_000).toString();
  }

  private async saveOtpToDB(email: string, code: string) {
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    this.otpRepository.findOneAndUpdate(
      { email },
      {
        email,
        code,
        expiresAt,
        isVerified: false,
      },
      {
        upsert: true,
      },
    );
  }
}
