import { Options } from './conversion.types';

export interface ConversionService {
  convert(options: Options): Promise<void>;
}
