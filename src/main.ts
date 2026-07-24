import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Environment } from './common/config/env.interface';
import { Logger } from '@nestjs/common';
import { CustomExceptionFilter } from './common/error-handling/filters/custom-exception.filter';
import { I18nValidationPipe } from 'nestjs-i18n';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new I18nValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new CustomExceptionFilter());

  const configService = app.get(ConfigService<Environment>);
  const port = configService.getOrThrow<number>('port');

  await app.listen(port);
  Logger.log(`Server started on port: ${port}`);
}
bootstrap();
