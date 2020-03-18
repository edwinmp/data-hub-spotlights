import { EChartOption } from 'echarts';
import React, { FunctionComponent } from 'react';
import { BudgetType, formatNumber, toCamelCase, RevenueExpenditureConfig } from '../../utils';
import { EChartsBaseChart } from '../EChartsBaseChart';
import { RevenueExpenditureData } from '../RevenueExpenditureSection/utils';
import { getSeriesData, getRootLevel, isIndexBased } from './utils';

interface ComponentProps {
  data?: RevenueExpenditureData[];
  budgetType?: BudgetType;
  useLocalCurrency?: boolean;
  height?: string;
  config?: RevenueExpenditureConfig;
}

const RevenueExpenditureTreeMap: FunctionComponent<ComponentProps> = ({ data, ...props }) => {
  const seriesData = getSeriesData(data, props.config, props.useLocalCurrency);
  const rootLevel = data ? getRootLevel(data, seriesData, props.useLocalCurrency) : '';
  const options: EChartOption<EChartOption.SeriesTreemap> = {
    tooltip: {
      formatter: (info: EChartOption.Tooltip.Format): string => {
        const { name, treePathInfo, value } = info as any; // eslint-disable-line @typescript-eslint/no-explicit-any
        const percentage = `${formatNumber((value / treePathInfo[0].value) * 100, 1)}%`;

        return `${name} - ${percentage} | ${formatNumber(value, 1)}`;
      }
    },
    xAxis: { show: false },
    yAxis: { show: false },
    color: ['#8f1b13'],
    series: [
      {
        name: rootLevel ? `${toCamelCase(rootLevel[0].split('-').join(' '))} | ${formatNumber(rootLevel[1])}` : 'Root',
        type: 'treemap',
        leafDepth: 1,
        itemStyle: {
          borderWidth: 0.5
        },
        upperLabel: {
          show: true,
          backgroundColor: '#8f1b13',
          padding: 8,
          height: 30,
          formatter: (info: EChartOption.Tooltip.Format): string => {
            const { name, treePathInfo, value } = info as any; // eslint-disable-line @typescript-eslint/no-explicit-any
            const percentage = `${formatNumber((value / treePathInfo[0].value) * 100, 1)}%`;

            return `${name} - ${percentage} | ${formatNumber(value, 1)}`;
          }
        },
        breadcrumb: {
          height: 30,
          itemStyle: {
            color: '#8f1b13',
            borderColor: '#FFFFFF',
            shadowBlur: 0
          }
        },
        label: {
          formatter: (info: EChartOption.Tooltip.Format): string => {
            const { data, name, treePathInfo, value } = info as any; // eslint-disable-line @typescript-eslint/no-explicit-any
            const percentage = `${formatNumber((value / treePathInfo[0].value) * 100, 1)}%`;

            return !data.children || data.children.length == 0
              ? `${name || ''}\n{a|${percentage} | ${formatNumber(value as number, 1)}}`
              : `${name || ''}\n    {a|${percentage} | ${formatNumber(value as number, 1)}}`;
          },
          rich: {
            a: {
              fontSize: 14,
              lineHeight: 30,
              color: '#FFFFFF'
            }
          }
        },
        levels: [
          {
            upperLabel: { show: false }
          }
        ] as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        data: data ? (isIndexBased(data) ? seriesData : seriesData[0].children) : []
      }
    ]
  };

  return <EChartsBaseChart options={options} height={props.height} />;
};

RevenueExpenditureTreeMap.defaultProps = { height: '490px', useLocalCurrency: false };

export { RevenueExpenditureTreeMap };
