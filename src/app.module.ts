import { Module } from '@nestjs/common';
import { CliModule } from './cli/cli.module';
import { ConversionsModule } from './converters/conversion.module';

@Module({
  imports: [CliModule, ConversionsModule]
})
export class AppModule { }
