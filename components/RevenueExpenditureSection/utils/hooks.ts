import { DataLoaderProps, useDDWData } from '../../DDWDataLoader';
import { processRevenueExpenditureData } from './data';
import { RevenueExpenditureHook } from './types';
import { groupBy } from 'underscore';
import { BudgetType } from '../../../utils';

export const useRevenueExpenditureData = (optns: DataLoaderProps): RevenueExpenditureHook => {
  const { data, dataLoading, options, setOptions } = useDDWData(optns);
  if (!dataLoading && data && data.length) {
    const processedData = processRevenueExpenditureData(data[0].data);
    const groupedByBudgetType = groupBy(processedData, processedData => processedData.budgetType);

    return {
      data: groupedByBudgetType,
      dataLoading: false,
      options,
      setOptions,
      budgetTypes: Object.keys(groupedByBudgetType) as BudgetType[]
    };
  }

  return { data: {}, dataLoading: false, options, setOptions, budgetTypes: [] };
};
