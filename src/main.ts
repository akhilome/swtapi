import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';

import { AppModule } from './app.module';
import { Environment } from './common';
import { GlobalExceptionFilter } from './common/global-exception.filter';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { ValidationExceptionFilter } from './common/validation-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning();

  app.use(helmet());

  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new ValidationExceptionFilter(),
    new GlobalExceptionFilter(),
  );

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  const config = await app.get(ConfigService);
  await app.listen(config.get(Environment.PORT));
}
bootstrap();
