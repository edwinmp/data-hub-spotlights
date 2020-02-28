import React, { FunctionComponent } from 'react';
import { EChartsBaseChart } from '../EChartsBaseChart';
import { toBasicAxisData } from '../EChartsBaseChart/utils';

interface LocationComparisonChartProps {
  yAxis: string[];
  series: number[][];
}

const LocationComparisonChart: FunctionComponent<LocationComparisonChartProps> = props => {
  const options: ECharts.Options = {
    legend: { show: false },
    xAxis: [
      {
        type: 'value',
        position: 'top'
      },
      {
        type: 'value',
        gridIndex: 1,
        position: 'top',
        inverse: true
      }
    ],
    yAxis: [
      {
        show: false,
        type: 'category',
        data: toBasicAxisData(props.yAxis)
      },
      {
        type: 'category',
        gridIndex: 1,
        data: toBasicAxisData(props.yAxis),
        offset: 20,
        axisTick: { show: false }
      }
    ],
    grid: [{ left: '50%' }, { right: '50%' }],
    series: [
      {
        type: 'bar',
        data: toBasicAxisData(props.series[0])
      },
      {
        type: 'bar',
        data: toBasicAxisData(props.series[1]),
        xAxisIndex: 1,
        yAxisIndex: 1
      }
    ]
  };

  return <EChartsBaseChart options={options} height="500px" />;
};

export { LocationComparisonChart };
