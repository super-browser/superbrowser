import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable API versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useWebSocketAdapter(new WsAdapter(app));

  // Enable CORS
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Headless browsers for AI agents')
    .setDescription('Headless browsers for AI agents')
    .setVersion('0.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
