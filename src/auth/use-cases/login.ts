import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { GenerateTokensUseCase } from './generate-tokens.usecase';
import { LoginDto } from '../dtos/login.dto';
import { BadRequestException } from '../../common/error-handling/custom-exceptions/bad-request.exception';
import bcrypt from 'bcryptjs';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly i18n: I18nService,
    private readonly usersService: UsersService,
    private readonly generateTokensUseCase: GenerateTokensUseCase,
  ) {}

  async execute(body: LoginDto) {
    const user = await this.usersService.findOne({
      email: body.email,
    });

    if (!user) {
      throw new BadRequestException(
        this.i18n.t('validation.USER.INVALID_CREDENTIALS'),
      );
    }

    const isPasswordMatched = await bcrypt.compare(
      body.password,
      user.password,
    );

    if (!isPasswordMatched) {
      throw new BadRequestException(
        this.i18n.t('validation.USER.INVALID_CREDENTIALS'),
      );
    }

    const tokens = await this.generateTokensUseCase.execute(String(user._id));

    return {
      user: user,
      tokens,
    };
  }
}
