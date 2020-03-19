import { EChartOption } from 'echarts';

export const axisDefaults: Partial<EChartOption.BasicComponents.CartesianAxis> = {
  axisLine: {
    lineStyle: { color: '#ddd' }
  },
  axisLabel: {
    color: '#32313f'
  },
  splitLine: {
    show: false,
    lineStyle: { color: '#ccc' }
  }
};

export const defaults: Partial<EChartOption> = {
  color: ['#8f1b13', '#e84439', '#f0826d', '#f5aa9b', '#fad1c9'],
  yAxis: {
    ...axisDefaults
  },
  xAxis: axisDefaults,
  textStyle: {
    fontFamily: 'Geomanist Regular,sans-serif'
  }
};
