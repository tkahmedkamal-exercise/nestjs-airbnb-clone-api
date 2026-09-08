import { Model } from 'mongoose';
import { BaseRepository, MODEL_NAMES } from '../../common/data-access';
import { Otp } from '../schemas/otp.schema';
import { InjectModel } from '@nestjs/mongoose';

export class OtpRepository extends BaseRepository<Otp> {
  constructor(
    @InjectModel(MODEL_NAMES.OTP)
    private readonly otpModel: Model<Otp>,
  ) {
    super(otpModel);
  }
}
