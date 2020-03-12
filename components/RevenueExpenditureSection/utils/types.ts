import { Dispatch, SetStateAction } from 'react';
import { BudgetType } from '../../../utils';
import { DataLoaderProps } from '../../DDWDataLoader';

export interface RevenueExpenditureHook {
  data: YearData;
  dataLoading: boolean;
  options: DataLoaderProps;
  setOptions: Dispatch<SetStateAction<DataLoaderProps>>;
}

export type YearData = { [key: string]: BudgetTypeData };

export type BudgetTypeData = { [key in BudgetType]?: RevenueExpenditureData[] };

export interface RevenueExpenditureData {
  year: number;
  value: number;
  valueLocalCurrency: number;
  budgetType: BudgetType;
  levels: string[];
}
