import React, { FunctionComponent } from 'react';
import { EChartsBaseChart } from '../EChartsBaseChart';
import { toBasicAxisData } from '../EChartsBaseChart/utils';

interface LocationComparisonChartProps {
  labels?: string[];
  series?: {
    names: [string, string];
    data: [number[], number[]];
  };
  height?: string;
}

const LocationComparisonBarChart: FunctionComponent<LocationComparisonChartProps> = props => {
  if (!props.series || !props.labels) {
    return <div>No Data</div>;
  }

  const options: ECharts.Options = {
    legend: { show: false },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
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
        data: toBasicAxisData(props.labels)
      },
      {
        type: 'category',
        gridIndex: 1,
        data: toBasicAxisData(props.labels),
        offset: 20,
        axisTick: { show: false }
      }
    ],
    grid: [{ left: '50%' }, { right: '50%' }],
    color: ['#0089cc', '#eb642b'], // TODO: perhaps configure these in CMS
    series: [
      {
        type: 'bar',
        name: props.series.names[0],
        barWidth: 20,
        data: toBasicAxisData(props.series.data[0])
      },
      {
        type: 'bar',
        name: props.series.names[1],
        barWidth: 20,
        data: toBasicAxisData(props.series.data[1]),
        xAxisIndex: 1,
        yAxisIndex: 1
      }
    ]
  };

  return <EChartsBaseChart options={options} height={props.height} />;
};

export { LocationComparisonBarChart };
