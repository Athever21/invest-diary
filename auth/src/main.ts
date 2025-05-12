import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true })
  app.use(cookieParser())
  app.use(cors({origin: true, credentials: true}))
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.NODE_DOCKER_PORT ?? 3000, '0.0.0.0');
}
bootstrap();
