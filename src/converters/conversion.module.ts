import { Module } from '@nestjs/common';
import { JsonConversionService } from './json/json-conversion.service';
@Module({
  providers: [JsonConversionService]
})
export class ConversionsModule { }
