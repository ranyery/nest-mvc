import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

// Converter string para function => onclick='{{ stringifyFunc fnName }}'
import { handlebars } from 'hbs';
handlebars.registerHelper('stringifyFunc', function (fn) {
  return new handlebars.SafeString(
    '(' + fn.toString().replace(/\'/g, '"') + ')()',
  );
});

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
