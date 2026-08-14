import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { AdminRepository } from './repository/admin.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { MODEL_NAMES } from '../common/data-access';
import { adminSchema } from './schemas/admin.schema';
import { InitSuperAdminUseCase } from './use-cases/init-super-admin.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MODEL_NAMES.ADMINS, schema: adminSchema },
    ]),
  ],
  controllers: [AdminsController],
  providers: [AdminsService, AdminRepository, InitSuperAdminUseCase],
})
export class AdminsModule {}
