import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { FindOneUserUseCase } from './use-cases/find-one-user.usecase';
import { MODEL_NAMES } from '../common/data-access';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MODEL_NAMES.USERS, schema: UserSchema },
    ]),
  ],
  providers: [UsersService, CreateUserUseCase, FindOneUserUseCase],
  exports: [UsersService],
})
export class UsersModule {}
