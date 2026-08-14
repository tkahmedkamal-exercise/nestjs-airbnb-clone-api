import { Injectable, OnModuleInit } from '@nestjs/common';
import { InitSuperAdminUseCase } from './use-cases/init-super-admin.usecase';

@Injectable()
export class AdminsService implements OnModuleInit {
  constructor(private readonly initSuperAdminUseCase: InitSuperAdminUseCase) {}

  async onModuleInit() {
    await this.initSuperAdminUseCase.execute();
  }
}
