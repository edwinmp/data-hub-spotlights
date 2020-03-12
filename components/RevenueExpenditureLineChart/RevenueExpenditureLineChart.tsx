import React, { FunctionComponent } from 'react';
import { EChartsBaseChart } from '../EChartsBaseChart';
import { YearData } from '../RevenueExpenditureSection/utils';

interface ComponentProps {
  data: YearData;
  height?: string;
}

const RevenueExpenditureLineChart: FunctionComponent<ComponentProps> = props => {
  const options: ECharts.Options = {
    legend: { show: false },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: (params: ECharts.TooltipFormatterParams[]): string => {
        const { value } = params[0];

        return `<div style="font-size:16px;"><strong>${value[0]}</strong> - ${value[1]}</div>`;
      }
    },
    xAxis: {
      type: 'value',
      min: 2000,
      axisLabel: {
        formatter: (value: number): number => value
      },
      interval: 1
    },
    yAxis: {
      splitLine: { show: true }
    },
    series: [
      {
        type: 'line',
        data: [
          [2001, 20],
          [2002, 34]
        ],
        showSymbol: false
      }
    ]
  };

  return <EChartsBaseChart options={options} height={props.height} />;
};

RevenueExpenditureLineChart.defaultProps = { height: '500px' };

export { RevenueExpenditureLineChart };
