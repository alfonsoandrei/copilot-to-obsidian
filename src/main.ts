import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CliService } from './cli/convert-cli.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const cliService = app.get(CliService);

  cliService.run();
}
bootstrap();
