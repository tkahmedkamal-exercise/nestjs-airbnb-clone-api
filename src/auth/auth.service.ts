import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(body: RegisterDto) {
    const user = await this.usersService.create(body);
    return await this.generateTokens(String(user._id));
  }

  private async generateTokens(userId: string) {
    const accessToken = await this.jwtService.signAsync({ userId });
    return { accessToken };
  }
}
