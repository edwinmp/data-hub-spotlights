import { BudgetType, extraValueFromMeta, LocationData } from '../../../utils';
import { RevenueExpenditureData } from './types';

const getLevels = (data: LocationData): string[] => {
  const levels: string[] = [];
  ['l1', 'l2', 'l3', 'l4', 'l5', 'l6'].forEach(level => {
    const value = extraValueFromMeta(data.meta, level) as string;
    if (value) {
      levels.push(value);
    }
  });

  return levels;
};

export const processRevenueExpenditureData = (data: LocationData[]): RevenueExpenditureData[] => {
  return data
    .filter(_data => _data.value)
    .map(_data => ({
      year: _data.year,
      value: _data.value,
      valueLocalCurrency: extraValueFromMeta(_data.meta, 'valueLocalCurrency') as number,
      budgetType: extraValueFromMeta(_data.meta, 'budgetType') as BudgetType,
      levels: getLevels(_data)
    }));
};
