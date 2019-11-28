import { NumericAxisConfig } from './PlottableAxis';

export interface AxisOptions {
  domain: number[];
  orientation?: 'left' | 'right' | 'top' | 'bottom';
  yAlignment?: 'top' | 'center' | 'bottom';
  tickInterval?: number;
}

export type NumericAxisConfig = NumericAxisConfig;
