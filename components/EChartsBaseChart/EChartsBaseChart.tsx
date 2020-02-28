import merge from 'deepmerge';
import { init } from 'echarts';
import React, { useEffect, useRef, FunctionComponent, useState } from 'react';
import { axisDefaults, defaults } from './utils/options';

interface EChartBaseChartProps {
  width?: string;
  height?: string;
  classNames?: string;
  options: ECharts.Options;
}

const setOptions = (chart: ECharts.EChartsInstance, options: ECharts.Options): void => {
  if (options.xAxis && Array.isArray(options.xAxis)) {
    options.xAxis = options.xAxis.map(axis => merge(axisDefaults, axis));
  }
  if (options.yAxis && Array.isArray(options.yAxis)) {
    options.yAxis = options.yAxis.map(axis => merge(axisDefaults, axis));
  }
  chart.setOption(merge(defaults, options));
};

const EChartsBaseChart: FunctionComponent<EChartBaseChartProps> = props => {
  const chartNode = useRef<HTMLDivElement>(null);
  const [baseChart, setBaseChart] = useState<ECharts.EChartsInstance | undefined>(undefined);
  useEffect(() => {
    if (chartNode && chartNode.current) {
      const chart = init(chartNode.current);
      setOptions(chart, props.options);
      setBaseChart(chart);
    }
  }, []);
  useEffect(() => {
    if (baseChart) {
      setOptions(baseChart, props.options);
    }
  }, [props.options]);

  return <div ref={chartNode} style={{ width: props.width, height: props.height }} className={props.classNames} />;
};

EChartsBaseChart.defaultProps = {
  width: '100%',
  height: '400px'
};

export { EChartsBaseChart as default, EChartsBaseChart };
