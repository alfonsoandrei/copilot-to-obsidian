import { Module } from '@nestjs/common';
import { CliService } from './cli.service';
import { ConversionsModule } from 'src/converters/conversion.module';
import { JSON_CONVERSION_SERVICE } from 'src/converters/conversion.constants';
import { JsonConversionService } from 'src/converters/json/json-conversion.service';

@Module({
  imports: [ConversionsModule],
  providers: [
    CliService,
    {
      provide: JSON_CONVERSION_SERVICE,
      useClass: JsonConversionService,
    },
  ],
})
export class CliModule {}
