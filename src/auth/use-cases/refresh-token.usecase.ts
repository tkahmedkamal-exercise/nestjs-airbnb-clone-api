import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { GenerateTokensUseCase } from './generate-tokens.usecase';
import bcrypt from 'bcryptjs';
import { I18nService } from 'nestjs-i18n';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { ForbiddenException } from '../../common/error-handling/custom-exceptions/forbidden.exception';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { RefreshToken } from '../schemas/refresh-token.schema';
import { InjectModel } from '@nestjs/mongoose';

type RefreshTokenPayload = { type: string; userId: string };

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly i18n: I18nService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly generateTokensUseCase: GenerateTokensUseCase,
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshToken>,
  ) {}

  async execute(body: RefreshTokenDto) {
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

    return await this.generateTokensUseCase.execute(refreshTokenDoc.userId);
  }
}
