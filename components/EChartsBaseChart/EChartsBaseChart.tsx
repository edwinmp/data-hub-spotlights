import React, { useEffect, useRef } from 'react';
import { init } from 'echarts';

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
      baseChart.setOption(props.options);
    }
  }, []);

  return (
    <div ref={ chartNode } style={ { width: props.width, height: props.height } }/>
  );
};

EChartsBaseChart.defaultProps = {
  width: '600px',
  height: '400px'
};

export { EChartsBaseChart as default, EChartsBaseChart };
