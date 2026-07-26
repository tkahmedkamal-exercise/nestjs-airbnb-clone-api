import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model, QueryFilter } from 'mongoose';

@Injectable()
export class FindOneUserUseCase {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async execute(query: QueryFilter<User>) {
    return await this.userModel.findOne(query).select('-__v');
  }
}
