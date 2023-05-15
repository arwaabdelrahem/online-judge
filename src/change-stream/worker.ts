import { NestFactory } from '@nestjs/core';
import { ChangeStreamModule } from './change-stream.module';

async function bootstrap() {
  const app = await NestFactory.create(ChangeStreamModule);
  app.init();
}

bootstrap();
