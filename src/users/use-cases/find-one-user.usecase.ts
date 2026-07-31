import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model, QueryFilter } from 'mongoose';
import { MODEL_NAMES } from '../../common/data-access';

@Injectable()
export class FindOneUserUseCase {
  constructor(
    @InjectModel(MODEL_NAMES.USERS) private readonly userModel: Model<User>,
  ) {}

  async execute(query: QueryFilter<User>) {
    return await this.userModel.findOne(query).select('-__v');
  }
}
