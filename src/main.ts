import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';

import { AppModule } from './app.module';
import { Environment } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning();

  app.use(helmet());

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  const config = await app.get(ConfigService);
  await app.listen(config.get(Environment.PORT));
}
bootstrap();
