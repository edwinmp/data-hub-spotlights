import React, { FunctionComponent } from 'react';
import { EChartsBaseChart } from '../EChartsBaseChart';
// import { toBasicAxisData } from '../EChartsBaseChart/utils';
import { RevenueExpenditureData } from '../RevenueExpenditureSection/utils';

interface ComponentProps {
  data?: RevenueExpenditureData[];
  height?: string;
}

const RevenueExpenditureLineChart: FunctionComponent<ComponentProps> = props => {
  if (!props.data) {
    return <div>No Data</div>;
  }

  const options: ECharts.Options = {
    legend: { show: false },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: (params: ECharts.TooltipFormatterParams[]): string => {
        const { value } = params[0];
        if (value) {
          const date = new Date(value[0]);

          return `<div style="font-size:16px;"><strong>${date.getFullYear()}</strong> - ${value[1]}</div>`;
        }

        return `<em>tooltip</em>`;
      }
    },
    xAxis: {
      type: 'time',
      min: '2001-01-01',
      axisLabel: {
        formatter: (value): number => {
          const date = new Date(value);

          return date.getFullYear();
        }
      }
    },
    yAxis: {
      splitLine: { show: true }
    },
    series: [
      {
        type: 'line',
        data: [
          ['2001-01-01', 20],
          ['2002-01-01', 34],
          ['2003-01-01', 45],
          ['2004-01-01', 23],
          ['2005-01-01', 12],
          ['2006-01-01', 7]
        ],
        showSymbol: false
      }
    ]
  };

  return <EChartsBaseChart options={options} height={props.height} />;
};

RevenueExpenditureLineChart.defaultProps = { height: '500px' };

export { RevenueExpenditureLineChart };
