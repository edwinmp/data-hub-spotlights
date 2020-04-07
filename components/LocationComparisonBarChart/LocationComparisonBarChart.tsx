import { EChartOption } from 'echarts';
import React, { FunctionComponent } from 'react';
import { toCamelCase } from '../../utils';
import { EChartsBaseChart } from '../EChartsBaseChart';
import { toBasicAxisData } from '../EChartsBaseChart/utils';
import { formatNumber, addPrefixAndSuffix, ValueOptions } from '../../utils';
import { formatSeries } from '../ComparisonChartDataHandler/utils';

interface LocationComparisonChartProps {
  labels?: string[];
  series?: {
    names: [string, string];
    data: [number[], number[]];
  };
  height?: string;
  valueOptions: ValueOptions[];
}

const LocationComparisonBarChart: FunctionComponent<LocationComparisonChartProps> = ({ valueOptions, ...props }) => {
  if (!props.series || !props.labels) {
    return <div>No Data</div>;
  }

  const options: EChartOption = {
    legend: { show: false },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },

      formatter: (params: EChartOption.Tooltip.Format[]): string => {
        const { seriesName, name, seriesIndex, value } = params[0];

        return seriesIndex === 1
          ? formatSeries(name, seriesName, value as number, valueOptions[1])
          : formatSeries(name, seriesName, value as number, valueOptions[0]);
      }
    },
    xAxis: [
      {
        type: 'value',
        position: 'top',
        axisLabel: {
          formatter: (value: number): string =>
            value === 0 ? '0' : addPrefixAndSuffix(formatNumber(value, 0), valueOptions[0])
        }
      },
      {
        type: 'value',
        gridIndex: 1,
        position: 'top',
        inverse: true,
        axisLabel: {
          formatter: (value: number): string =>
            value === 0 ? '0' : addPrefixAndSuffix(formatNumber(value, 0), valueOptions[1])
        }
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
        offset: 5,
        axisTick: { show: false },
        axisLabel: {
          formatter: (value: string): string => toCamelCase(value)
        }
      }
    ],
    grid: [
      { left: '55%', right: 20 },
      { right: '45%', left: '12%' }
    ],
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
    ] as EChartOption.SeriesBar[]
  };

  return <EChartsBaseChart options={options} height={props.height} />;
};

export { LocationComparisonBarChart };
