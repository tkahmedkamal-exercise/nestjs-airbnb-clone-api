import bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { AdminRepository } from './../repository/admin.repository';
import { Injectable, Logger } from '@nestjs/common';
import { Environment, SuperAdmin } from '../../common/config/env.interface';

@Injectable()
export class InitSuperAdminUseCase {
  private logger = new Logger(InitSuperAdminUseCase.name);

  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly configService: ConfigService<Environment>,
  ) {}

  async execute() {
    const { name, email, password } =
      this.configService.getOrThrow<SuperAdmin>('superAdmin');

    const existingSuperAdmin = await this.adminRepository.findOne({ email });

    if (existingSuperAdmin) {
      this.logger.log('Super admin already exists.');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.adminRepository.create({
      name,
      email,
      password: hashedPassword,
      isSuperAdmin: true,
    });

    this.logger.log('Super admin initialized successfully.');
  }
}
