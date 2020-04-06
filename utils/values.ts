import { SpotlightLocation, formatNumber } from '.';

export interface ValueOptions {
  useLocalValue?: boolean;
  dataFormat: 'plain' | 'currency' | 'percent';
  aggregation?: string;
  prefix?: string;
  suffix?: string;
  location?: SpotlightLocation;
  decimalCount?: number;
}

export const DEFAULT_VALUE = 'No Data';

export const addPrefixAndSuffix = (value: string | number, options: ValueOptions): string => {
  return `${options.prefix || ''} ${value}${options.suffix || ''}`;
};
export const formatSeries = (
  index: number,
  name: string | undefined,
  seriesName: string | undefined,
  value: number,
  valueOptions: ValueOptions[]
): string => {
  return `<div>${name}<ul><li>${seriesName}: ${addPrefixAndSuffix(
    formatNumber(value, 1),
    valueOptions[index]
  )}</li></ul></div>`;
};
