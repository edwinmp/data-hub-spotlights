import { EChartOption } from 'echarts';
import React, { FunctionComponent } from 'react';
import { toCamelCase } from '../../utils';
import { EChartsBaseChart } from '../EChartsBaseChart';
import { toBasicAxisData } from '../EChartsBaseChart/utils';
import { formatNumber, addPrefixAndSuffix, ValueOptions } from '../../utils';

interface LocationComparisonChartProps {
  labels?: string[];
  series?: {
    names: [string, string];
    data: [number[], number[]];
  };
  height?: string;
  valueOptions: [ValueOptions, ValueOptions];
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
        const { seriesName, name, seriesIndex } = params[0];
        const { value } = params[0] as { value: number };

        if (seriesIndex === 1) {
          return `<div>${name} <ul><li>${seriesName}: ${addPrefixAndSuffix(
            formatNumber(value, 1),
            valueOptions[1]
          )}</li></ul></div>`;
        }

        return `<div>${name} <ul><li>${seriesName}: ${addPrefixAndSuffix(
          formatNumber(value, 1),
          valueOptions[0]
        )}</li></ul></div>`;
      }
    },
    xAxis: [
      {
        type: 'value',
        position: 'top',
        axisLabel: {
          formatter: (value: number): string => {
            return addPrefixAndSuffix(formatNumber(value, 0), valueOptions[0]);
          }
        }
      },
      {
        type: 'value',
        gridIndex: 1,
        position: 'top',
        inverse: true,
        axisLabel: {
          formatter: (value: number): string => {
            return addPrefixAndSuffix(formatNumber(value, 0), valueOptions[1]);
          }
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
