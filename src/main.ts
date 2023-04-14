import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());
  const options = new DocumentBuilder()
    .setTitle('Online judge')
    .setDescription('Online judge Api')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      name: 'authorization',
      scheme: 'bearer',
      in: 'header',
      bearerFormat: 'Bearer',
    })
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(8000);
}
bootstrap();
