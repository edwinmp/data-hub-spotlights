const axisDefaults: Partial<ECharts.Axis> = {
  axisLine: {
    lineStyle: {
      color: '#443e42'
    }
  }
};
export const textDefaults: Partial<ECharts.TextStyle> = {
  fontFamily: 'inherit'
};

export const defaults: Partial<ECharts.Options> = {
  color: [ '#8f1b13', '#e84439', '#f0826d', '#f5aa9b', '#fad1c9' ],
  yAxis: {
    ...axisDefaults
  },
  xAxis: axisDefaults
};
