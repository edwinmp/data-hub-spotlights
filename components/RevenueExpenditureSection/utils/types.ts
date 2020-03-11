import { Dispatch, SetStateAction } from 'react';
import { BudgetType } from '../../../utils';
import { DataLoaderProps } from '../../DDWDataLoader';

export interface RevenueExpenditureHook {
  data: GroupedRevenueExpenditureData;
  dataLoading: boolean;
  budgetTypes: BudgetType[];
  options: DataLoaderProps;
  setOptions: Dispatch<SetStateAction<DataLoaderProps>>;
}

export type GroupedRevenueExpenditureData = { [key in BudgetType]?: RevenueExpenditureData[] };

export interface RevenueExpenditureData {
  value: number;
  valueLocalCurrency: number;
  budgetType: BudgetType;
}
