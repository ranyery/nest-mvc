import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { join } from 'path';
import { AppModule } from './app.module';

// Converter string para function => onclick='{{ stringifyFunc fnName }}'
import handlebars from 'handlebars';
handlebars.registerHelper('stringifyFunc', function (fn) {
  return new handlebars.SafeString(
    '(' + fn.toString().replace(/\'/g, '"') + ')()',
  );
});

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });

  app.setViewEngine({
    engine: { handlebars },
    templates: join(__dirname, '..', 'views'),
  });

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
