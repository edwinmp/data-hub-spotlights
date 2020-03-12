import { groupBy } from 'underscore';
import { DataLoaderProps, useDDWData } from '../../DDWDataLoader';
import { processRevenueExpenditureData } from './data';
import { GroupedRevenueExpenditureData, RevenueExpenditureHook } from './types';

export const useRevenueExpenditureData = (optns: DataLoaderProps): RevenueExpenditureHook => {
  const { data, dataLoading, options, setOptions } = useDDWData(optns);
  if (!dataLoading && data && data.length) {
    const processedData = processRevenueExpenditureData(data[0].data);
    const groupedByYear = groupBy(processedData, processedData => processedData.year);
    const groupedByYearAndBudgetType: { [key: string]: GroupedRevenueExpenditureData } = {};
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
