import { Body, Controller, Post } from '@nestjs/common';
import { OtpService } from './otp.service';
import { SendOtpDto } from './dtos/send-otp.dto';
import { Public } from '../auth/decorators/public.decorator';
import { VerifyOtpDto } from './dtos/verify-otp.dto';

// TODO: Add Rate Limiting to this endpoint to prevent abuse
@Public()
@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('/send')
  send(@Body() body: SendOtpDto) {
    return this.otpService.send(body);
  }

  @Post('/verify')
  verify(@Body() body: VerifyOtpDto) {
    return this.otpService.verify(body);
  }
}
