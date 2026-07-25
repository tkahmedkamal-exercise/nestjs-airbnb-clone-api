import { Injectable } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class CustomI18nService {
  constructor(private readonly i18nService: I18nService) {}

  t(t: string, options?: any): string {
    const lang = I18nContext.current()?.lang;
    return this.i18nService.t(t, { lang, ...options });
  }
}
