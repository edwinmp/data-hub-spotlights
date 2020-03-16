import { EChartOption } from 'echarts';
import React, { FunctionComponent } from 'react';
import { BudgetType, formatNumber } from '../../utils';
import { EChartsBaseChart } from '../EChartsBaseChart';
import { YearData } from '../RevenueExpenditureSection/utils';

interface ComponentProps {
  data: YearData;
  budgetType?: BudgetType;
  useLocalCurrency?: boolean;
  height?: string;
}

const RevenueExpenditureTreeMap: FunctionComponent<ComponentProps> = props => {
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
        name: 'Revenue',
        type: 'treemap',
        leafDepth: 1,
        itemStyle: {
          borderWidth: 0.5
        },
        upperLabel: {
          show: true,
          backgroundColor: '#8f1b13',
          padding: 8,
          height: 30
        },
        breadcrumb: {
          height: 30,
          itemStyle: {
            color: '#8f1b13',
            borderColor: '#FFFFFF',
            shadowBlur: 0
          }
        },
        levels: [
          {
            upperLabel: { show: false }
          }
        ] as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        data: [
          {
            name: 'Conditional Government Transfers', // First leaf of first tree
            value: 8,
            children: [
              {
                name: 'Conditional Grants To Primary Salaries', // Son of first tree
                value: 8,
                children: [
                  {
                    name: 'Public School Primary Salaries', // Son of first tree
                    value: 3
                  },
                  {
                    name: 'Private School Primary Salaries', // Son of first tree
                    value: 5
                  }
                ]
              }
            ]
          },
          {
            name: 'Locally Raised Revenues', // Second leaf of first tree
            value: 12,
            children: [
              {
                name: 'Inspection Fees', // Son of first tree
                value: 9
              },
              {
                name: 'Business Licenses', // Son of first tree
                value: 3
              }
            ]
          },
          {
            name: 'Discretionary Government Transfers', // Second leaf of first tree
            value: 3,
            children: [
              {
                name: 'Transfer of Digital Unconditional Grant Wage', // Son of first tree
                value: 2
              },
              {
                name: 'Transfer of Urban Unconditional Grant Wage', // Son of first tree
                value: 1
              }
            ]
          }
        ]
      }
    ]
  };

  return <EChartsBaseChart options={options} height={props.height} />;
};

RevenueExpenditureTreeMap.defaultProps = { height: '460px', useLocalCurrency: false };

export { RevenueExpenditureTreeMap };
