import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Environment } from './common/config/env.interface';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService<Environment>);
  const port = configService.getOrThrow<number>('port');

  await app.listen(port);
  Logger.log(`Server started on port: ${port}`);
}
bootstrap();
