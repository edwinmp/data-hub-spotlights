export const toBasicAxisData = (values: string[]): ECharts.Data[] =>
  values.map(value => ({ value }));
