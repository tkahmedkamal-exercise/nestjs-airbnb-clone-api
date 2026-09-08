import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../dtos/register.dto';
import { UsersService } from '../../users/users.service';
import { GenerateTokensUseCase } from './generate-tokens.usecase';
import { Roles } from '../../common/constants';
import { OtpRepository } from '../../otp/repository/otp.repository';
import { BadRequestException } from '../../common/error-handling/custom-exceptions/bad-request.exception';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly usersService: UsersService,
    private readonly generateTokensUseCase: GenerateTokensUseCase,
    private readonly otpRepository: OtpRepository,
  ) {}

  async execute(body: RegisterDto) {
    await this.emailVerification(body.email);

    const user = await this.usersService.create(body);
    const tokens = await this.generateTokensUseCase.execute({
      userId: String(user._id),
      role: Roles.USER,
    });

    return {
      user: user.toObject(),
      tokens,
    };
  }

  async emailVerification(email: string) {
    const emailIsVerified = await this.otpRepository.findOne({
      email,
      isVerified: true,
    });

    if (!emailIsVerified) {
      throw new BadRequestException('Email is not verified');
    }
  }
}
