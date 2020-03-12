declare module 'echarts' {
  function init(node: HTMLElement, theme?: string | null, options?: ECharts.InitOptions): ECharts.EChartsInstance;

  export { init };
}

declare namespace ECharts {
  interface InitOptions {
    devicePixelRatio?: number;
    renderer?: 'canvas' | 'svg';
    width?: 'string' | null;
    height?: 'string' | null;
  }

  interface EChartsInstance {
    setOption: (options: Options) => void;
  }

  export interface TooltipFormatterParams {
    componentType: 'series';
    // Series type
    seriesType: string;
    // Series index in option.series
    seriesIndex: number;
    // Series name
    seriesName: string;
    // Data name, or category name
    name: string;
    // Data index in input data array
    dataIndex: number;
    // Original data as input
    data: Record<string, any>;
    // Value of data. In most series it is the same as data.
    // But in some series it is some part of the data (e.g., in map, radar)
    value: number | Array | Record<string, any>;
    // encoding info of coordinate system
    // Key: coord, like ('x' 'y' 'radius' 'angle')
    // value: Must be an array, not null/undefined. Contain dimension indices, like:
    // {
    //     x: [2] // values on dimension index 2 are mapped to x axis.
    //     y: [0] // values on dimension index 0 are mapped to y axis.
    // }
    encode: Record<string, any>;
    // dimension names list
    dimensionNames: Array<string>;
    // data dimension index, for example 0 or 1 or 2 ...
    // Only work in `radar` series.
    dimensionIndex: number;
    // Color of data
    color: string;

    // the percentage of pie chart
    percent: number;
  }

  type TFP = TooltipFormatterParams;

  interface Options {
    title?: {
      text: string;
    };
    tooltip?: {
      trigger?: 'item' | 'axis' | 'none';
      formatter?: string | ((params: TFP | TFP[], ticket: string | number, callback?: () => void) => string);
      axisPointer?: {
        type: 'line' | 'shadow' | 'cross' | 'none';
      };
    };
    legend?: Legend;
    xAxis?: XAxis | XAxis[];
    yAxis?: YAxis | YAxis[];
    series?: Series[];
    color?: string[];
    grid?: Grid | Grid[];
    textStyle?: TextStyle;
    dataset?: Dataset;
  }

  type DatasetSource =
    | Array<Array<string | number> | { [key: string]: string | number }>
    | { [key: string]: Array<string | number> };

  interface DataSet {
    source: DatasetSource;
  }

  interface Legend {
    show?: boolean;
    data?: string[];
  }

  interface Axis {
    name?: string;
    nameLocation?: 'start' | 'end' | 'center';
    nameTextStyle?: TextStyle;
    show?: boolean;
    data?: Data[] | (string | number)[];
    axisLine?: AxisLine;
    axisLabel?: AxisLabel;
    axisTick?: AxisTick;
    splitLine?: SplitLine;
    type?: AxisType;
    inverse?: boolean;
    offset?: number;
    gridIndex?: number;
    boundaryGap?: boolean;
    min?: number | string;
    max?: number | string;
    interval?: number;
    minInterval?: number;
    maxInterval?: number;
  }

  type AxisType = 'category' | 'value' | 'time' | 'log';

  interface YAxis extends Axis {
    position?: 'left' | 'right';
  }

  interface XAxis extends Axis {
    position?: 'top' | 'bottom';
  }

  interface Data {
    value: string | number;
    textStyle?: TextStyle;
  }

  interface TextStyle {
    color?: string;
    fontStyle?: string;
    fontSize?: number;
    fontFamily?: string;
    padding?: number | number[];
  }

  interface AxisLine {
    show?: boolean;
    lineStyle?: AxisLineStyle;
    onZero?: boolean;
  }

  interface AxisLabel {
    show?: boolean;
    formatter?: ((value: string | number, index: number) => void) | string;
  }

  interface AxisTick {
    show?: boolean;
    alignWithLabel?: boolean;
    interval?: 'auto' | number;
    length?: number;
    inside?: boolean;
    lineStyle?: LineStyle;
  }

  interface SplitLine {
    show?: boolean;
    lineStyle?: SplitLineStyle;
  }

  interface LineStyle {
    color?: string;
    width?: number;
    type?: 'solid' | 'dashed' | 'dotted';
    opacity?: number;
  }

  type AxisLineStyle = LineStyle;
  type SplitLineStyle = LineStyle;

  interface Grid {
    show?: boolean;
    left?: string | number;
    top?: string | number;
    right?: string | number;
    bottom?: string | number;
  }

  interface Series {
    name?: string;
    type: 'line' | 'bar' | 'pie';
    data?: any[]; // FIXME: give a proper type - not sure it's possible
    encode?: SeriesEncode;
    seriesLayoutBy?: 'column' | 'row';
    xAxisIndex?: number;
    yAxisIndex?: number;
    label?: SeriesLabel;
    barWidth?: number;
    barGap?: string;
    showSymbol?: boolean;
  }

  interface SeriesLabel {
    normal?: {
      show?: boolean;
      position?: 'inside' | 'outside' | 'center';
      formatter?: string;
    };
  }

  interface SeriesEncode {
    x?: string | number[];
    y?: string | number[];
    tooltip?: string | number[];
  }
}
