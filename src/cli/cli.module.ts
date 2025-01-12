import { Module } from '@nestjs/common';
import { CliService } from './convert-cli.service';

@Module({
  providers: [CliService],
})
export class CliModule { }
