import { formatNumber, ValueOptions, addPrefixAndSuffix } from '../../../utils';

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
