import { Body, Inject, Injectable, Logger } from '@nestjs/common';
import { EMAIL_PROVIDE_TOKEN } from './tokes';
import type { EmailAdapter } from './interfaces';
import { SendMailDto } from './dto/send-mail.dto';
import { BadRequestException } from '../common/error-handling/custom-exceptions/bad-request.exception';

@Injectable()
export class MailService {
  private logger = new Logger(MailService.name);

  constructor(
    @Inject(EMAIL_PROVIDE_TOKEN) private readonly emailAdapter: EmailAdapter,
  ) {}

  async sendMail(@Body() dto: SendMailDto) {
    try {
      await this.emailAdapter.sendMail(dto);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(
        'Failed to send email. Please check your SMTP configuration and try again.',
      );
    }
  }
}
