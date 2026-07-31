import { Injectable } from '@nestjs/common';
import { BadRequestException } from '../../common/error-handling/custom-exceptions/bad-request.exception';
import bcrypt from 'bcryptjs';
import { I18nService } from 'nestjs-i18n';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dtos/create-user.dto';
import { MODEL_NAMES } from '../../common/data-access';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly i18n: I18nService,
    @InjectModel(MODEL_NAMES.USERS) private readonly userModel: Model<User>,
  ) {}

  async execute(body: CreateUserDto) {
    const existingUserByEmail = await this.userModel.findOne({
      email: body.email,
    });

    if (existingUserByEmail) {
      throw new BadRequestException(
        this.i18n.t('validation.USER.EMAIL_EXISTS'),
      );
    }

    const existingUserByPhoneNumber = await this.userModel.findOne({
      phoneNumber: body.phoneNumber,
    });

    if (existingUserByPhoneNumber) {
      throw new BadRequestException(
        this.i18n.t('validation.USER.PHONE_NUMBER_EXISTS'),
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    return await this.userModel.create({
      ...body,
      password: hashedPassword,
    });
  }
}
