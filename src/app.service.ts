import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment } from './common/config/env.interface';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService<Environment>) {}

  getHello(): string {
    const port = this.configService.get<number>('port');
    console.log(port);

    return 'Hello World!';
  }
}
