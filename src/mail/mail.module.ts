import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { EMAIL_PROVIDE_TOKEN } from './tokes';
import { NodemailerAdapter } from './adapters/nodemailer.adapter';

@Module({
  providers: [
    MailService,
    {
      provide: EMAIL_PROVIDE_TOKEN,
      useClass: NodemailerAdapter,
    },
  ],
  controllers: [MailController],
  exports: [MailService],
})
export class MailModule {}
