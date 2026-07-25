import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import { BadRequestException } from '../common/error-handling/custom-exceptions/bad-request.exception';
import bcrypt from 'bcryptjs';
import { I18nService } from 'nestjs-i18n';
import { Model } from 'mongoose';
import { RefreshToken } from './schemas/refresh-token.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Environment } from '../common/config/env.interface';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { ForbiddenException } from '../common/error-handling/custom-exceptions/forbidden.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshToken>,
    private readonly i18n: I18nService,
    private readonly configService: ConfigService<Environment>,
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
      tokens,
    };
  }

  async refreshToken(body: RefreshTokenDto) {
    type RefreshTokenPayload = { type: string; userId: string };
    let decodedToken: RefreshTokenPayload;

    try {
      decodedToken = await this.jwtService.verifyAsync<RefreshTokenPayload>(
        body.refreshToken,
      );

      if (decodedToken.type !== 'refresh') {
        throw new ForbiddenException('Invalid refresh token');
      }
    } catch {
      throw new ForbiddenException('Invalid refresh token');
    }

    const refreshTokenDoc = await this.refreshTokenModel.findOne({
      userId: decodedToken.userId,
    });

    if (!refreshTokenDoc) {
      throw new ForbiddenException('Invalid refresh token');
    }

    const refreshTokenMatched = await bcrypt.compare(
      body.refreshToken,
      refreshTokenDoc.refreshToken,
    );

    if (!refreshTokenMatched) {
      throw new ForbiddenException('Invalid refresh token');
    }

    return await this.generateTokens(refreshTokenDoc.userId);
  }

  private async generateTokens(userId: string) {
    const accessToken = await this.jwtService.signAsync({ userId });
    const refreshToken = await this.jwtService.signAsync(
      { type: 'refresh', userId },
      { expiresIn: this.configService.getOrThrow('refreshTokenExpiresIn') },
    );

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    // Update refresh token for userId. If not exist create it
    await this.refreshTokenModel.findOneAndUpdate(
      { userId },
      { refreshToken: hashedRefreshToken },
      // { new: true } is deprecated use {returnDocument: after} instead
      { returnDocument: 'after', upsert: true },
    );

    return { accessToken, refreshToken };
  }
}
