import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

const PORT = process.env.NEST_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bodyParser: true,
    logger: ['verbose', 'error', 'warn', 'debug', 'log']
  });
  const config = new DocumentBuilder()
    .setTitle('Data API')
    .setDescription('')
    .setVersion('1.0')
    .addTag('')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Enable CORS
  app.enableCors();

  // start host on 0.0.0.0:PORT
  await app.listen(PORT, 
    '0.0.0.0'
  )
}
bootstrap();
