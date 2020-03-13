import { EChartOption } from 'echarts';
import React, { FunctionComponent } from 'react';
import { BudgetType, formatNumber } from '../../utils';
import { EChartsBaseChart } from '../EChartsBaseChart';
import { RevenueExpenditureData, YearData } from '../RevenueExpenditureSection/utils';

interface ComponentProps {
  data: YearData;
  budgetType?: BudgetType;
  useLocalCurrency?: boolean;
  height?: string;
}

const fetchRootData = (data?: RevenueExpenditureData[], useLocalCurrency = false): number | null => {
  if (data) {
    const rootData = data.find(d => d.levels.length === 1);
    if (rootData) {
      return useLocalCurrency ? rootData.valueLocalCurrency : rootData.value;
    } else {
      return data.reduce((prev, curr) => {
        if (useLocalCurrency) {
          return (curr.valueLocalCurrency || 0) + prev;
        }

        return (curr.value || 0) + prev;
      }, 0);
    }
  }

  return null;
};

const formatData = (data: YearData, budgetType?: BudgetType, useLocalCurrency = false): [number, number][] => {
  const formattedData: [number, number][] = [];
  Object.keys(data).forEach(year => {
    const yearData = data[year];
    if (budgetType && yearData.hasOwnProperty(budgetType)) {
      const rootData = fetchRootData(yearData[budgetType], useLocalCurrency);
      if (rootData) {
        formattedData.push([parseInt(year), rootData]);
      }
    } else {
      const _budgetType = Object.keys(yearData)[0] as BudgetType | undefined;
      if (_budgetType) {
        const rootData = fetchRootData(yearData[_budgetType], useLocalCurrency);
        if (rootData) {
          formattedData.push([parseInt(year), rootData]);
        }
      }
    }
  });

  return formattedData;
};

const RevenueExpenditureLineChart: FunctionComponent<ComponentProps> = props => {
  const data = formatData(props.data, props.budgetType, props.useLocalCurrency);

  const options: EChartOption = {
    legend: { show: false },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params: EChartOption.Tooltip.Format[]): string => {
        const { value } = params[0] as { value: [number, number] };

        return `<div style="font-size:16px;"><strong>${value[0]}</strong> - ${formatNumber(value[1], 1)}</div>`;
      }
    },
    xAxis: {
      type: 'value',
      min: data.length && data[0].length ? data[0][0] : undefined,
      axisLabel: { formatter: (value: number): number => value },
      interval: data && data.length <= 12 ? 1 : 4
    },
    yAxis: {
      splitLine: { show: true },
      axisLabel: {
        formatter: (value: number): string => {
          return formatNumber(value, 0);
        }
      }
    },
    series: [
      {
        type: 'line',
        data,
        showSymbol: false
      }
    ]
  };

  return <EChartsBaseChart options={options} height={props.height} />;
};

RevenueExpenditureLineChart.defaultProps = { height: '500px', useLocalCurrency: false };

export { RevenueExpenditureLineChart };
