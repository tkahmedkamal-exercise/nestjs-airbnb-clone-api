import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { createHash } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { RefreshToken } from '../schemas/refresh-token.schema';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { Environment } from '../../common/config/env.interface';
import { MODEL_NAMES } from '../../common/data-access';
import { Roles } from '../../common/constants';

export interface JwtPayload {
  userId: string;
  role: Roles;
}

@Injectable()
export class GenerateTokensUseCase {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(MODEL_NAMES.REFRESH_TOKENS)
    private readonly refreshTokenModel: Model<RefreshToken>,
    private readonly configService: ConfigService<Environment>,
  ) {}

  async execute(payload: JwtPayload) {
    const accessToken = await this.jwtService.signAsync({
      userId: payload.userId,
      role: payload.role,
    });
    const refreshToken = await this.jwtService.signAsync(
      { ...payload, type: 'refresh' },
      { expiresIn: this.configService.getOrThrow('refreshTokenExpiresIn') },
    );

    const hashedRefreshToken = createHash('sha256')
      .update(refreshToken)
      .digest('hex');

    // Update refresh token for userId. If not exist create it
    await this.refreshTokenModel.findOneAndUpdate(
      { userId: payload.userId },
      { refreshToken: hashedRefreshToken },
      // { new: true } is deprecated use {returnDocument: after} instead
      { returnDocument: 'after', upsert: true },
    );

    return { accessToken, refreshToken };
  }
}
