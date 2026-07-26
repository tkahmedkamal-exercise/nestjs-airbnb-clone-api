import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { QueryFilter } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { FindOneUserUseCase } from './use-cases/find-one-user.usecase';

@Injectable()
export class UsersService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findOneUserUseCase: FindOneUserUseCase,
  ) {}

  async create(body: CreateUserDto) {
    return await this.createUserUseCase.execute(body);
  }

  async findOne(query: QueryFilter<User>) {
    return await this.findOneUserUseCase.execute(query);
  }
}
