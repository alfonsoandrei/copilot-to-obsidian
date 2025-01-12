import { Test, TestingModule } from '@nestjs/testing';
import { JsonConversionService } from './json-conversion.service';

describe('JsonConversionService', () => {
  let service: JsonConversionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JsonConversionService],
    }).compile();

    service = module.get<JsonConversionService>(JsonConversionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
