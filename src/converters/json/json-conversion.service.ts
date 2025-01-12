import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';
import { ConversionService } from '../conversion.interface';

@Injectable()
export class JsonConversionService implements ConversionService {
  async convert(options: { input: string; output: string; title: string }): Promise<void> {
    try {
      const inputData = await fs.readFile(options.input, 'utf-8');

      const chatData = JSON.parse(inputData);

      const markdownContent = chatData.requests
        .map((request: any) => {
          const question = request.message.text;
          const bestAnswer =
            request.response.find((resp: any) => resp.value)?.value || 'No answer found';
          return `## Question\n\n${question}\n\n## Answer\n\n${bestAnswer}\n`;
        })
        .join('\n');

      const finalContent = `# ${options.title}\n\n${markdownContent}`;

      const outputFilePath =
        path.extname(options.output) === '.md' ? options.output : `${options.output}.md`;

      await fs.writeFile(outputFilePath, finalContent);

      console.log('Conversion success.');
    } catch (error) {
      console.error('Conversion failed:', error);
    }
  }
}
