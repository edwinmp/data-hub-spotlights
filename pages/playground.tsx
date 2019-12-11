import fetch from 'isomorphic-unfetch';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import merge from 'deepmerge';
import { DefaultLayoutData, Footer, Navigation } from '../components/DefaultLayout';
import { EChartsBaseChart } from '../components/EChartsBaseChart';
import { PageSection } from '../components/PageSection';
import { toBasicAxisData } from '../components/EChartsBaseChart/utils';
import { Legend, LegendItem, StyledLegendItem } from '../components/Legend';
import { Select } from '../components/Select';

interface PlaygroundProps {
  setData?: (data: DefaultLayoutData) => void;
  navigation: Navigation;
  footer: Footer;
}

const Playground: NextPage<PlaygroundProps> = ({ footer, navigation, setData }) => {
  useEffect(() => {
    if (setData) {
      setData({ navigation, footer });
    }
  }, [ setData, navigation ]);

  const options1: ECharts.Options = {
    title: {
        text: 'Basic Bar Chart'
    },
    tooltip: {},
    legend: {
        data: [ 'Sales', 'Expenses' ]
    },
    xAxis: {
        data: toBasicAxisData([ 'Shirt', 'Cardign', 'Chiffon Shirt', 'Pants', 'Heels', 'Socks' ])
    },
    yAxis: {},
    series: [
      {
        name: 'Sales',
        type: 'bar',
        data: [ 5, 20, 36, 15, 10, 25 ]
      },
      {
        name: 'Expenses',
        type: 'bar',
        data: [ 2, 30, 3, 40, 20, 36 ]
      }
    ]
  };

  const options2: ECharts.Options = {
    title: {
        text: 'Inverted Bar Chart - Via Dataset'
    },
    tooltip: {},
    legend: {
        data: [ 'Sales', 'Expenses' ]
    },
    xAxis: { type: 'value' },
    yAxis: { type: 'category' },
    series: [
      { type: 'bar' },
      { type: 'bar' }
    ],
    dataset: {
      source : [
        [ 'item', 'Sales', 'Expenses' ],
        [ 'Shirt', 5, 2 ],
        [ 'Cardigan', 20, 30 ],
        [ 'Chiffon Shirt', 34, 23 ],
        [ 'Pants', 56, 12 ]
      ]
    }
  };

  const options3 = merge<ECharts.Options>(options2, {
    title: {
      text: 'Bar Chart - Reverse Axis'
    },
    xAxis: { inverse: true },
    yAxis: { position: 'right' }
  });

  const options4 = merge<ECharts.Options>(options2, {
    title: {
      text: 'Bar Chart Grid v1'
    },
    legend: {},
    xAxis: [
      { type: 'value', gridIndex: 0 },
      { type: 'value', gridIndex: 1 }
    ],
    yAxis: [
      { type: 'category', gridIndex: 0 },
      { type: 'category', gridIndex: 1 }
    ],
    grid: [
        { bottom: '55%' },
        { top: '55%' }
    ]
  });
  options4.legend = {};
  options4.series = [
    { type: 'bar', seriesLayoutBy: 'row' },
    { type: 'bar', seriesLayoutBy: 'row' },
    { type: 'bar', seriesLayoutBy: 'row' },
    { type: 'bar', seriesLayoutBy: 'row' },
    { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
    { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 }
  ];

  const options5 = merge<ECharts.Options>(options1, {
    title: {
      text: 'Bar Chart Grid - Cool Data Comparison'
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
        data: toBasicAxisData([ 'Shirt', 'Cardign', 'Chiffon Shirt', 'Pants', 'Heels', 'Socks' ])
      },
      {
        type: 'category',
        gridIndex: 1,
        data: toBasicAxisData([ 'Shirt', 'Cardign', 'Chiffon Shirt', 'Pants', 'Heels', 'Socks' ]),
        offset: 20,
        axisTick: { show: false }
      }
    ],
    grid: [
        { left: '50%' },
        { right: '50%' }
    ]
  });
  options5.legend = {};
  options5.series = [
    {
      type: 'bar',
      data: toBasicAxisData([ 5, 20, 36, 15, 10, 25 ])
    },
    {
      type: 'bar',
      data: toBasicAxisData([ 2, 30, 3, 40, 20, 36 ]),
      xAxisIndex: 1,
      yAxisIndex: 1
    }
  ];

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

  return (
    <PageSection>
      <h1>Visualisation Playground</h1>
      <EChartsBaseChart options={ options1 }/>
      <EChartsBaseChart options={ options2 } height="500px"/>
      <EChartsBaseChart options={ options3 } height="500px"/>
      <EChartsBaseChart options={ options4 } height="800px"/>
      <EChartsBaseChart options={ options5 } height="800px"/>
      <div>
        <Select options={ options }/>
      </div>
      <div style={ { width: '400px', backgroundColor: '#fff', padding: '20px' } }>
        <Legend>
          <StyledLegendItem bgColor="#fad1c9">{ '<30%' }</StyledLegendItem>
          <StyledLegendItem bgColor="#f5aa9b">{ '30% - 50%' }</StyledLegendItem>
          <StyledLegendItem bgColor="#f0826d">{ '50% - 70%' }</StyledLegendItem>
          <StyledLegendItem bgColor="#e84439">{ '70% - 90%' }</StyledLegendItem>
          <StyledLegendItem bgColor="#8f1b13" textColor="#fff">{ '>90%' }</StyledLegendItem>
          <LegendItem>no data / not applicable</LegendItem>
        </Legend>
      </div>
    </PageSection>
  );
};

Playground.getInitialProps = async () => {
  const res_navigation = await fetch(`${process.env.ASSETS_SOURCE_URL}api/spotlights/navigation/`);
  const navigation = await res_navigation.json();
  const res_footer = await fetch(`${process.env.ASSETS_SOURCE_URL}api/footer/`);
  const footer = await res_footer.json();

  return {
    navigation,
    footer
  };
};

export default Playground;
