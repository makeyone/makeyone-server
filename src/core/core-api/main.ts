import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import { initializeTransactionalContext } from 'typeorm-transactional';

import { AppModule } from '@src/core/core-module/App.module';

import { HttpExceptionFilter } from '@src/core/core-api/support/error/HttpExceptionFilter';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule, {
    abortOnError: true,
  });
  app.enableCors({
    origin: process.env.NODE_ENV === 'prod' ? ['https://www.makeyone.com', 'https://gallery.makeyone.com'] : true,
    credentials: true,
  });

  morgan.token('date', function () {
    return new Date().toLocaleString();
  });
  app.use(morgan(process.env.NODE_ENV === 'prod' ? 'combined' : '[:date] :status :method  :url :response-time ms'));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.use(cookieParser());

  app.useGlobalFilters(new HttpExceptionFilter());

  // TODO: Sentry와 Slack 연동 후 사용
  // app.useGlobalInterceptors(new SentryInterceptorWithSlack());
  // SentryInit({
  //   dsn: process.env.SENTRY_CLIENT_DSN_KEY,
  // });

  await app.listen(process.env.SERVER_PORT);
}

bootstrap();
