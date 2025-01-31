import { Module } from '@nestjs/common';
import { CliService } from './cli.service';
import { ConversionsModule } from '../converters/conversion.module';
import { Command } from 'commander';

@Module({
  imports: [ConversionsModule],
  providers: [CliService, Command],
})
export class CliModule {}
