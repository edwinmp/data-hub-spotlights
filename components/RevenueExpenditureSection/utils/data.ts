import { BudgetType, extraValueFromMeta, LocationData } from '../../../utils';
import { RevenueExpenditureData } from './types';

export const processRevenueExpenditureData = (data: LocationData[]): RevenueExpenditureData[] => {
  return data.map(_data => ({
    year: _data.year,
    value: _data.value,
    valueLocalCurrency: extraValueFromMeta(_data.meta, 'valueLocalCurrency') as number,
    budgetType: extraValueFromMeta(_data.meta, 'budgetType') as BudgetType
  }));
};
