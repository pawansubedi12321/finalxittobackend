import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import 'dotenv/config';
import { ResponseInterceptor } from './core/interceptors/response.interceptor';
import * as compression from 'compression';
import path, { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { hostname } from 'os';
import * as process from 'process'
import { hostname } from 'os';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});

  // app.useStaticAssets(path.join(__dirname, '..', '/'));

  app.setGlobalPrefix('api/v1');

  app.useStaticAssets(join(__dirname, '..', '/'));

  /*
      protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
  
      collection of smaller middleware functions that set security-related HTTP headers
  
      provides 11 security related middlewares
    */
  app.use(helmet());

  //mechanism that allows resources to be requested from another domain
  app.enableCors();

  //exploit of a website where unauthorized commands are transmitted from a user that the web application trusts
  // app.use(csurf());

  // Compression can greatly decrease the size of the response body, thereby increasing the speed of a web app.
  app.use(compression());


  app.useGlobalPipes(
    new ValidationPipe({
      //removes all properties of request's body which are not in dto
      whitelist: true,

      //all to transform properties, int -> string
      transform: false,
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
    

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  
  await app.listen(process.env.APP_PORT ||9000, () => {
    console.log(`app running in port ${process.env.APP_PORT}`);
    for (let i = 0; i < 6; i++) {
      console.log('.');
    }
  });
  
}

bootstrap();
