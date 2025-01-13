import { Inject, Injectable } from '@nestjs/common';
import { Command } from 'commander';
import { JSON_CONVERSION_SERVICE } from '../converters/conversion.constants';
import { ConversionService } from 'src/converters/conversion.interface';

@Injectable()
export class CliService {
  private readonly command: Command;

  constructor(
    @Inject(JSON_CONVERSION_SERVICE)
    private readonly conversionService: ConversionService,
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
      .action(this.conversionService.convert.bind(this.conversionService));
  }

  run() {
    this.command.parse(process.argv);
  }
}
