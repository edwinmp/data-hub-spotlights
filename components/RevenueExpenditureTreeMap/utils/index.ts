import { RevenueExpenditureData } from '../../RevenueExpenditureSection/utils';
import { EChartOption } from 'echarts';
import { toCamelCase } from '../../../utils';

export type TreemapDataObject = EChartOption.SeriesTreemap.DataObject;

export const getRootLevel = (data: RevenueExpenditureData[], useLocalCurrency = false): [string, number] | null => {
  const rootData = data.find(d => d.levels.length === 1);

  return rootData ? [rootData.levels[0], useLocalCurrency ? rootData.valueLocalCurrency : rootData.value] : null;
};

export const getBranchChildren = (
  data: RevenueExpenditureData[],
  level: string,
  index = 0,
  useLocalCurrency = false
): TreemapDataObject[] => {
  const children: EChartOption.SeriesTreemap.DataObject[] = data
    .filter(item => item.levels[index] === level && item.levels.length === index + 2)
    .map(item => ({
      name: toCamelCase(item.levels[item.levels.length - 1].split('-').join(' ')),
      value: useLocalCurrency ? item.valueLocalCurrency : item.value,
      children: getBranchChildren(data, item.levels[item.levels.length - 1], index + 1, useLocalCurrency)
    }));

  return children;
};

export const getSeriesData = (data?: RevenueExpenditureData[], useLocalCurrency = false): TreemapDataObject[] => {
  if (data) {
    const rootLevel = getRootLevel(data, useLocalCurrency);
    if (rootLevel) {
      return getBranchChildren(data, rootLevel[0], 0, useLocalCurrency);
    }
  }

  return [];
};
