import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(body: RegisterDto) {
    return await this.usersService.create(body);
  }
}
