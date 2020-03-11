import { Dispatch, SetStateAction } from 'react';
import { BudgetType } from '../../../utils';
import { DataLoaderProps } from '../../DDWDataLoader';

export interface RevenueExpenditureHook {
  data: RevenueExpenditureData[];
  dataLoading: boolean;
  budgetTypes: BudgetType[];
  options: DataLoaderProps;
  setOptions: Dispatch<SetStateAction<DataLoaderProps>>;
}

export interface RevenueExpenditureData {
  value: number;
  valueLocalCurrency: number;
  budgetType: BudgetType;
}
