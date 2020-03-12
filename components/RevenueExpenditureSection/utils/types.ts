import { Dispatch, SetStateAction } from 'react';
import { BudgetType } from '../../../utils';
import { DataLoaderProps } from '../../DDWDataLoader';

export interface RevenueExpenditureHook {
  data: { [key: string]: GroupedRevenueExpenditureData };
  dataLoading: boolean;
  options: DataLoaderProps;
  setOptions: Dispatch<SetStateAction<DataLoaderProps>>;
}

export type GroupedRevenueExpenditureData = { [key in BudgetType]?: RevenueExpenditureData[] };

export interface RevenueExpenditureData {
  year: number;
  value: number;
  valueLocalCurrency: number;
  budgetType: BudgetType;
}
