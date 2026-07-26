import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../dtos/register.dto';
import { UsersService } from '../../users/users.service';
import { GenerateTokensUseCase } from './generate-tokens.usecase';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly usersService: UsersService,
    private readonly generateTokensUseCase: GenerateTokensUseCase,
  ) {}

  async execute(body: RegisterDto) {
    const user = await this.usersService.create(body);
    const tokens = await this.generateTokensUseCase.execute(String(user._id));

    return {
      user: user.toObject(),
      tokens,
    };
  }
}
