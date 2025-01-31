import { Module } from '@nestjs/common';
import { JsonConversionService } from './json/json-conversion.service';
import { JSON_CONVERSION_SERVICE } from './conversion.constants';

@Module({
  providers: [
    JsonConversionService,
    {
      provide: JSON_CONVERSION_SERVICE,
      useClass: JsonConversionService,
    },
  ],
  exports: [
    {
      provide: JSON_CONVERSION_SERVICE,
      useClass: JsonConversionService,
    },
  ],
})
export class ConversionsModule {}
