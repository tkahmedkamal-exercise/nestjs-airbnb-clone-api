import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { LoginUserUseCase } from './login-user.usecase';
import { LoginAdminUseCase } from './login-admin.usecase';
import { Roles } from '../../common/constants';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly loginAdminUseCase: LoginAdminUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
  ) {}

  async execute(body: LoginDto) {
    if (body.role === Roles.ADMIN) {
      return this.loginAdminUseCase.execute(body);
    }

    return this.loginUserUseCase.execute(body);
  }
}
