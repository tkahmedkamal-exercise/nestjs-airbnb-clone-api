import { QueryFilter } from 'mongoose';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InitSuperAdminUseCase } from './use-cases/init-super-admin.usecase';
import { SuperAdmin } from '../common/config/env.interface';
import { FindOneAdminUseCase } from './use-cases/find-one-admin.usecase';

@Injectable()
export class AdminsService implements OnModuleInit {
  constructor(
    private readonly initSuperAdminUseCase: InitSuperAdminUseCase,
    private readonly findOneAdminUseCase: FindOneAdminUseCase,
  ) {}

  async onModuleInit() {
    await this.initSuperAdminUseCase.execute();
  }

  async findOne(body: QueryFilter<SuperAdmin>) {
    return await this.findOneAdminUseCase.execute(body);
  }
}
