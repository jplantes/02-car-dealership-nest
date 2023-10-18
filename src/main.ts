import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Solo deja la data definida en el DTO
      forbidNonWhitelisted: true, 
    })
  )
  await app.listen(3000);
}
bootstrap();
