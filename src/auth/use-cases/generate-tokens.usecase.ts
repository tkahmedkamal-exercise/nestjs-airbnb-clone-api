import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { RefreshToken } from '../schemas/refresh-token.schema';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { Environment } from '../../common/config/env.interface';

@Injectable()
export class GenerateTokensUseCase {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshToken>,
    private readonly configService: ConfigService<Environment>,
  ) {}

  async execute(userId: string) {
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
