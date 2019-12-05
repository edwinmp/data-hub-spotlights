import merge from 'deepmerge';
import { init } from 'echarts';
import React, { useEffect, useRef } from 'react';
import { defaults } from './utils/options';

interface EChartBaseChartProps {
  width?: string;
  height?: string;
  options: ECharts.Options;
}

const EChartsBaseChart = (props: EChartBaseChartProps) => {
  const chartNode = useRef(null);
  useEffect(() => {
    if (chartNode) {
      const baseChart = init(chartNode.current);
      baseChart.setOption(merge(defaults, props.options));
    }
  }, []);

  return (
    <div ref={ chartNode } style={ { width: props.width, height: props.height } }/>
  );
};

EChartsBaseChart.defaultProps = {
  width: '100%',
  height: '400px'
};

export { EChartsBaseChart as default, EChartsBaseChart };
