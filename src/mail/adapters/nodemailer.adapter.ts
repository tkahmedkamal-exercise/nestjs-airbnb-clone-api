import { Injectable } from '@nestjs/common';
import { EmailAdapter } from '../interfaces';
import { SendMailDto } from '../dto/send-mail.dto';
import { Environment, Smtp } from '../../common/config/env.interface';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NodemailerAdapter implements EmailAdapter {
  private readonly transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService<Environment>) {
    const smtp = this.configService.getOrThrow<Smtp>('smtp');
    this.transporter = nodemailer.createTransport(smtp);
  }

  async sendMail(dto: SendMailDto) {
    await this.transporter.sendMail({
      from: 'support@airbnb-clone.com',
      to: dto.to,
      subject: dto.subject,
      text: dto.text,
    });
  }
}
