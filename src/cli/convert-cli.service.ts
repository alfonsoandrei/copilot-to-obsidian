import { Inject, Injectable } from '@nestjs/common';
import { Command } from 'commander';
import { JSON_CONVERSION_SERVICE } from '../converters/conversion.constants';
import { JsonConversionService } from '../converters/json/json-conversion.service';

@Injectable()
export class CliService {
  private readonly command: Command;

  constructor(
    @Inject(JSON_CONVERSION_SERVICE)
    private readonly jsonConversionService: JsonConversionService,
  ) {
    this.command = new Command();

    this.command
      .name('copilot-to-obsidian')
      .description('Converts Copilot exports to markdown format');

    this.command
      .command('convert')
      .description('Converts Copilot exports to markdown format')
      .requiredOption('-i, --input <input>', 'Input file path')
      .requiredOption('-o, --output <output>', 'Output file path')
      .requiredOption('-t, --title <title>', 'Title for the markdown file')
      .action(
        this.jsonConversionService.convert.bind(this.jsonConversionService),
      );
  }

  run() {
    this.command.parse(process.argv);
  }
}
