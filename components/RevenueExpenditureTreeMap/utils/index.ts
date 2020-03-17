import { RevenueExpenditureData } from '../../RevenueExpenditureSection/utils';
import { EChartOption } from 'echarts';
import { toCamelCase, RevenueExpenditureConfig } from '../../../utils';

export type TreemapDataObject = EChartOption.SeriesTreemap.DataObject;

/**
 * Checks whether the data levels are index based or by aggregation
 * @param data - RevenueExpenditureData Array
 */
export const isIndexBased = (data: RevenueExpenditureData[]): boolean => !!data.find(d => d.levels.length === 1);

export const getRootLevelByLength = (
  data: RevenueExpenditureData[],
  useLocalCurrency = false
): [string, number] | null => {
  const rootData = data.find(d => d.levels.length === 1);

  return rootData ? [rootData.levels[0], useLocalCurrency ? rootData.valueLocalCurrency : rootData.value] : null;
};

export const getRootLevelFromSeriesData = (seriesData: TreemapDataObject[]): [string, number] | null =>
  seriesData.length === 1 ? [seriesData[0].name as string, seriesData[0].value as number] : null;

export const getRootLevel = (
  data: RevenueExpenditureData[],
  seriesData: TreemapDataObject[],
  useLocalCurrency = false
): [string, number] | null => {
  return getRootLevelByLength(data, useLocalCurrency) || getRootLevelFromSeriesData(seriesData);
};

/**
 * Works on (as it appears in the DDW) country-level data - All levels are represented here and do not require aggregation
 * to acquire parent values. i.e. root level will have a length of 1, next will have 2, and so forth
 * @param data - RevenueExpenditureData Array
 * @param level - Name/ID of the current level
 * @param index - Index of the current level - default is 0 for the root level
 * @param useLocalCurrency - Which value to use i.e. USD or local currency
 */
export const createDataTreeByIndex = (
  data: RevenueExpenditureData[],
  level: string,
  index = 0,
  useLocalCurrency = false
): TreemapDataObject[] => {
  return data
    .filter(item => item.levels[index] === level && item.levels.length === index + 2)
    .map(item => ({
      name: toCamelCase(item.levels[item.levels.length - 1].split('-').join(' ')),
      value: useLocalCurrency ? item.valueLocalCurrency : item.value,
      children: createDataTreeByIndex(data, item.levels[item.levels.length - 1], index + 1, useLocalCurrency)
    }));
};

export const createDataTreeByAggregation = (
  data: RevenueExpenditureData[],
  rootLevel: string,
  index = 0,
  useLocalCurrency = false
): TreemapDataObject => {
  const node = data.reduce(
    (previous: TreemapDataObject, current) => {
      const child = current.levels[index + 1];
      const exists = previous.children?.find(_child => _child.name === child);
      if (current.levels[index] === rootLevel && child && !exists) {
        // is it the last child?
        if (current.levels.indexOf(child) === current.levels.length - 1) {
          previous.children?.push({
            name: child,
            value: useLocalCurrency ? current.valueLocalCurrency : current.value,
            children: []
          });
        } else {
          previous.children?.push(createDataTreeByAggregation(data, child, index + 1, useLocalCurrency));
        }
      }

      return previous;
    },
    { name: rootLevel, children: [] }
  );
  // calculate node value by aggregation (SUM)
  node.value = node.children?.reduce((prev, curr) => prev + ((curr.value as number) || 0), 0);

  return node;
};

export const getSeriesData = (
  data?: RevenueExpenditureData[],
  config?: RevenueExpenditureConfig,
  useLocalCurrency = false
): TreemapDataObject[] => {
  if (data) {
    const rootLevel = getRootLevelByLength(data, useLocalCurrency);
    if (rootLevel) {
      return createDataTreeByIndex(data, rootLevel[0], 0, useLocalCurrency);
    }
    if (config) {
      return [createDataTreeByAggregation(data, config.root, 0, useLocalCurrency)];
    } else {
      console.log('Configure root in CMS');
    }
  }

  return [];
};
