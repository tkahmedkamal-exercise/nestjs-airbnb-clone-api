import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { GenerateTokensUseCase } from './generate-tokens.usecase';
import { LoginDto } from '../dtos/login.dto';
import { BadRequestException } from '../../common/error-handling/custom-exceptions/bad-request.exception';
import bcrypt from 'bcryptjs';
import { I18nService } from 'nestjs-i18n';
import { AdminsService } from '../../admins/admins.service';

@Injectable()
export class LoginAdminUseCase {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly usersService: UsersService,
    private readonly generateTokensUseCase: GenerateTokensUseCase,
  ) {}

  async execute(body: LoginDto) {
    const user = await this.adminsService.findOne({
      email: body.email,
    });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordMatched = await bcrypt.compare(
      body.password,
      user.password,
    );

    if (!isPasswordMatched) {
      throw new BadRequestException('Invalid credentials');
    }

    const tokens = await this.generateTokensUseCase.execute({
      userId: String(user._id),
      role: body.role,
    });

    return {
      user, // convert from Document to Object
      tokens,
    };
  }
}
