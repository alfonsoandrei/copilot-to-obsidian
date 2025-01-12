import { Test, TestingModule } from '@nestjs/testing';
import { JsonConversionService } from './json-conversion.service';
import * as fs from 'fs-extra';

jest.mock('fs-extra');

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

  describe('convert', () => {
    it('should convert JSON to markdown', async () => {
      const options = {
        input: 'input.json',
        output: 'output.md',
        title: 'Test Title',
      };

      const mockInputData = JSON.stringify({
        requests: [
          {
            message: { text: 'Question 1' },
            response: [{ value: 'Answer 1' }],
          },
          {
            message: { text: 'Question 2' },
            response: [{ value: 'Answer 2' }],
          },
        ],
      });

      (fs.readFile as any as jest.Mock).mockResolvedValue(mockInputData);
      (fs.writeFile as any as jest.Mock).mockResolvedValue(undefined);

      await service.convert(options);

      const expectedMarkdownContent = `# Test Title

## Question

Question 1

## Answer

Answer 1

## Question

Question 2

## Answer

Answer 2
`;

      expect(fs.readFile).toHaveBeenCalledWith('input.json', 'utf-8');
      expect(fs.writeFile).toHaveBeenCalledWith(
        'output.md',
        expectedMarkdownContent,
      );
    });
  });
});
