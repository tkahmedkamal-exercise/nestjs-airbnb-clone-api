import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { Public } from '../auth/decorators/public.decorator';
import { SendMailDto } from './dto/send-mail.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Public()
  @Post('/send')
  sendMail(@Body() dto: SendMailDto) {
    return this.mailService.sendMail(dto);
  }
}
