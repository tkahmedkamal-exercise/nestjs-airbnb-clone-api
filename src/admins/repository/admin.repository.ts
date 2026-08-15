import { BaseRepository, MODEL_NAMES } from '../../common/data-access';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Admin } from '../schemas/admin.schema';

@Injectable()
export class AdminRepository extends BaseRepository<Admin> {
  constructor(
    @InjectModel(MODEL_NAMES.ADMINS) private readonly adminModel: Model<Admin>,
  ) {
    super(adminModel);
  }
}
