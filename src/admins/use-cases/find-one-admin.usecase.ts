import { QueryFilter } from 'mongoose';
import bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { AdminRepository } from './../repository/admin.repository';
import { Injectable, Logger } from '@nestjs/common';
import { Environment, SuperAdmin } from '../../common/config/env.interface';

@Injectable()
export class FindOneAdminUseCase {
  constructor(private readonly adminRepository: AdminRepository) {}

  async execute(body: QueryFilter<SuperAdmin>) {
    return await this.adminRepository.findOne(body);
  }
}
