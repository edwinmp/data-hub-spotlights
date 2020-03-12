import { groupBy } from 'underscore';
import { DataLoaderProps, useDDWData } from '../../DDWDataLoader';
import { processRevenueExpenditureData } from './data';
import { BudgetTypeData, RevenueExpenditureHook as REHook } from './types';
import { SpotlightIndicator, SpotlightIndicatorContent } from '../../../utils';

export const useRevenueExpenditureData = (optns: DataLoaderProps, indicator: SpotlightIndicator): REHook => {
  const { data, dataLoading, options, setOptions } = useDDWData(optns);
  let contentOptions: SpotlightIndicatorContent = {};
  if (indicator.content_template) {
    try {
      contentOptions = JSON.parse(indicator.content_template);
    } catch (error) {
      console.log('Invalid JSON:', error.message);
    }
  }

  if (!dataLoading && data && data.length) {
    const configs = contentOptions.revenue || contentOptions.expenditure;
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
