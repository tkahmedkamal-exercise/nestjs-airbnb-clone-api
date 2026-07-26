import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { FindOneUserUseCase } from './use-cases/find-one-user.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService, CreateUserUseCase, FindOneUserUseCase],
  exports: [UsersService],
})
export class UsersModule {}
