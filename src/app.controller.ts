import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { BadRequestException } from './common/error-handling/custom-exceptions/bad-request.exception';
import { CustomI18nService } from './i18n/custom-i18n.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly i18nService: CustomI18nService,
  ) {}

  @Get()
  getHello(): string {
    throw new BadRequestException(
      this.i18nService.translate('validation.EMAIL_NOT_FOUND'),
    );

    return this.appService.getHello();
  }
}
