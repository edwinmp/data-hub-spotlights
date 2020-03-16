import { EChartOption } from 'echarts';
import React, { FunctionComponent } from 'react';
import { BudgetType, formatNumber, toCamelCase } from '../../utils';
import { EChartsBaseChart } from '../EChartsBaseChart';
import { RevenueExpenditureData } from '../RevenueExpenditureSection/utils';

interface ComponentProps {
  data?: RevenueExpenditureData[];
  budgetType?: BudgetType;
  useLocalCurrency?: boolean;
  height?: string;
}

type TreemapDataObject = EChartOption.SeriesTreemap.DataObject;

const getRootLevel = (data: RevenueExpenditureData[]): string | null => {
  const rootData = data.find(d => d.levels.length === 1);

  return rootData ? rootData.levels[0] : null;
};

const getBranchChildren = (
  data: RevenueExpenditureData[],
  level: string,
  index = 0,
  useLocalCurrency = false
): TreemapDataObject[] => {
  const children: EChartOption.SeriesTreemap.DataObject[] = data
    .filter(item => item.levels[index] === level && item.levels.length === index + 2)
    .map(item => ({
      name: toCamelCase(item.levels[item.levels.length - 1].split('-').join(' ')),
      value: useLocalCurrency ? item.valueLocalCurrency : item.value,
      children: getBranchChildren(data, item.levels[item.levels.length - 1], index + 1, useLocalCurrency)
    }));

  return children;
};

const getSeriesData = (data?: RevenueExpenditureData[], useLocalCurrency = false): TreemapDataObject[] => {
  if (data) {
    const rootLevel = getRootLevel(data);
    if (rootLevel) {
      return getBranchChildren(data, rootLevel, 0, useLocalCurrency);
    }
  }

  return [];
};

const RevenueExpenditureTreeMap: FunctionComponent<ComponentProps> = ({ data, ...props }) => {
  const rootLevel = data ? getRootLevel(data) : '';
  const options: EChartOption<EChartOption.SeriesTreemap> = {
    tooltip: {
      formatter: (info: EChartOption.Tooltip.Format): string => {
        const { name, treePathInfo, value } = info as any; // eslint-disable-line @typescript-eslint/no-explicit-any
        const percentage = `${formatNumber((value / treePathInfo[0].value) * 100, 1)}%`;

        return `${name} - ${percentage}`;
      }
    },
    xAxis: { show: false },
    yAxis: { show: false },
    color: ['#8f1b13'],
    series: [
      {
        name: rootLevel ? toCamelCase(rootLevel.split('-').join(' ')) : 'Root',
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
        data: getSeriesData(data, props.useLocalCurrency)
      }
    ]
  };

  return <EChartsBaseChart options={options} height={props.height} />;
};

RevenueExpenditureTreeMap.defaultProps = { height: '460px', useLocalCurrency: false };

export { RevenueExpenditureTreeMap };
