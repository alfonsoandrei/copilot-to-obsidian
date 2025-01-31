import { Module } from '@nestjs/common';
import { CliService } from './cli.service';
import { ConversionsModule } from '../converters/conversion.module';

@Module({
  imports: [ConversionsModule],
  providers: [CliService],
})
export class CliModule {}
