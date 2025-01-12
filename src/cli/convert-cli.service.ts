import { Injectable } from '@nestjs/common';
import { Command } from 'commander';
import * as fs from 'fs-extra';

@Injectable()
export class CliService {
  private readonly command: Command;

  constructor() {
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
      .action(this.convert.bind(this));
  }

  async convert(options: { input: string; output: string; title: string }) {
    try {
      const inputData = await fs.readFile(options.input, 'utf-8');
      const chatData = JSON.parse(inputData);

      const markdownContent = chatData.requests
        .map((request: any) => {
          const question = request.message.text;
          const bestAnswer =
            request.response.find((resp: any) => resp.value)?.value ||
            'No answer found';
          return `## Question\n\n${question}\n\n## Best Answer\n\n${bestAnswer}\n`;
        })
        .join('\n');

      const finalContent = `# ${options.title}\n\n${markdownContent}`;

      await fs.writeFile(options.output, finalContent);

      console.log('Conversion success.');
    } catch (error) {
      console.error('Conversion failed:', error);
    }
  }

  run() {
    this.command.parse(process.argv);
  }
}
