import { SendMailDto } from '../dto/send-mail.dto';

export interface EmailAdapter {
  sendMail(dto: SendMailDto): Promise<void>;
}
