import { groupBy } from 'underscore';
import { SpotlightIndicator } from '../../../utils';
import { DataLoaderProps, useDDWData } from '../../DDWDataLoader';
import { getIndicatorContentOptions, processRevenueExpenditureData } from './data';
import { BudgetTypeData, RevenueExpenditureHook as REHook } from './types';

export const useRevenueExpenditureData = (optns: DataLoaderProps, indicator: SpotlightIndicator): REHook => {
  const { data, dataLoading, options, setOptions } = useDDWData(optns);
  if (!dataLoading && data && data.length) {
    const configs = getIndicatorContentOptions(indicator);
    const processedData = processRevenueExpenditureData(data[0].data, configs);
    const groupedByYear = groupBy(processedData, processedData => processedData.year);
    const groupedByYearAndBudgetType: { [key: string]: BudgetTypeData } = {};
    Object.keys(groupedByYear).forEach(year => {
      const groupedByBudgetType = groupBy(groupedByYear[year], processedData => processedData.budgetType);
      groupedByYearAndBudgetType[year] = groupedByBudgetType;
    });

    return {
      data: groupedByYearAndBudgetType,
      dataLoading: false,
      options,
      setOptions
    };
  }

  return { data: {}, dataLoading, options, setOptions };
};
