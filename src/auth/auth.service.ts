import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import { BadRequestException } from '../common/error-handling/custom-exceptions/bad-request.exception';
import bcrypt from 'bcryptjs';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly i18n: I18nService,
  ) {}

  async register(body: RegisterDto) {
    const user = await this.usersService.create(body);
    return await this.generateTokens(String(user._id));
  }

  async login(body: LoginDto) {
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

    const tokens = await this.generateTokens(String(user._id));

    return {
      user: user,
      token: tokens.accessToken,
    };
  }

  private async generateTokens(userId: string) {
    const accessToken = await this.jwtService.signAsync({ userId });
    return { accessToken };
  }
}
