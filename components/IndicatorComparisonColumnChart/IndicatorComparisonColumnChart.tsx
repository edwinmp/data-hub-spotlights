import React, { FunctionComponent } from 'react';
import { EChartsBaseChart } from '../EChartsBaseChart';
import { toBasicAxisData } from '../EChartsBaseChart/utils';
import { EChartOption } from 'echarts';
import { formatNumber, addPrefixAndSuffix, ValueOptions } from '../../utils';

interface ComponentProps {
  series?: {
    names: [string, string];
    data: [number[], number[]];
  };
  height?: string;
  valueOptions: ValueOptions[];
}

const IndicatorComparisonColumnChart: FunctionComponent<ComponentProps> = ({ valueOptions, ...props }) => {
  if (!props.series) {
    return <div>No Data</div>;
  }

  const options: EChartOption = {
    tooltip: {
      formatter: (params: EChartOption.Tooltip.Format): string => {
        const { seriesName, name, seriesIndex } = params;
        const { value } = params as { value: number };
        console.log(params);
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
    legend: { show: false },
    xAxis: {
      data: toBasicAxisData(['Indicators']),
      axisLabel: { show: false }
    },
    yAxis: [
      {
        name: props.series.names[0],
        nameLocation: 'center',
        nameTextStyle: { padding: 30 },
        type: 'value',
        position: 'left',
        axisLabel: {
          formatter: (value: number): string => {
            return addPrefixAndSuffix(formatNumber(value, 0), valueOptions[0]);
          }
        }
      },
      {
        name: props.series.names[1],
        type: 'value',
        position: 'right',
        nameLocation: 'center',
        nameTextStyle: { padding: 30 },
        axisLabel: {
          formatter: (value: number): string => {
            return addPrefixAndSuffix(formatNumber(value, 0), valueOptions[1]);
          }
        }
      }
    ],
    color: ['#0089cc', '#eb642b'], // TODO: perhaps configure these in CMS
    series: [
      {
        name: props.series.names[0],
        type: 'bar',
        barWidth: 70,
        barGap: '100%',
        data: toBasicAxisData(props.series.data[0])
      },
      {
        name: props.series.names[1],
        type: 'bar',
        barWidth: 70,
        barGap: '100%',
        yAxisIndex: 1,
        data: toBasicAxisData(props.series.data[1])
      }
    ] as EChartOption.SeriesBar[]
  };

  return <EChartsBaseChart options={options} height={props.height} />;
};

export { IndicatorComparisonColumnChart };
