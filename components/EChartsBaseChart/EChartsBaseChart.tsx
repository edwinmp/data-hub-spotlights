import merge from 'deepmerge';
import ReactResizeDetector from 'react-resize-detector';
import { init, EChartOption, ECharts, EChartsMediaOption } from 'echarts';
import React, { useEffect, useRef, FunctionComponent, useState } from 'react';
import { axisDefaults, defaults } from './utils/options';

interface EChartBaseChartProps {
  width?: string;
  height?: string;
  classNames?: string;
  options: EChartOption;
  media?: EChartsMediaOption[];
}

const setOptions = (chart: ECharts, options: EChartOption, media?: EChartsMediaOption[]): void => {
  if (options.xAxis && Array.isArray(options.xAxis)) {
    options.xAxis = options.xAxis.map(axis => merge(axisDefaults, axis));
  }
  if (options.yAxis && Array.isArray(options.yAxis)) {
    options.yAxis = options.yAxis.map(axis => merge(axisDefaults, axis));
  }
  chart.setOption({
    baseOption: merge(defaults, options, { arrayMerge: (_destinationArray, sourceArray) => sourceArray }),
    media
  });
};

const EChartsBaseChart: FunctionComponent<EChartBaseChartProps> = props => {
  const chartNode = useRef<HTMLDivElement>(null);
  const [baseChart, setBaseChart] = useState<ECharts | undefined>(undefined);
  useEffect(() => {
    if (chartNode && chartNode.current) {
      const chart = init(chartNode.current);
      setOptions(chart, props.options, props.media);
      setBaseChart(chart);
    }
  }, []);
  useEffect(() => {
    if (baseChart) {
      setOptions(baseChart, props.options, props.media);
    }
  }, [props.options]);
  useEffect(() => {
    if (props.height && baseChart) {
      baseChart.resize({ height: props.height });
    }
  }, [props.height]);

  const onResize = (width: number): void => {
    if (baseChart) {
      baseChart.resize({ width: `${width}px` });
    }
  };

  return (
    <div ref={chartNode} style={{ width: props.width, height: props.height }} className={props.classNames}>
      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
    </div>
  );
};

EChartsBaseChart.defaultProps = {
  width: '100%',
  height: '400px'
};

export { EChartsBaseChart as default, EChartsBaseChart };
