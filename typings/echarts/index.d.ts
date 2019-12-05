declare module 'echarts';

declare namespace ECharts {
  interface Options {
    title?: {
      text: string;
    };
    tooltip?: any; // FIXME: give a proper type
    legend?: {
      data: string[];
    }
    xAxis?: XAxis | XAxis[];
    yAxis?: YAxis | YAxis[];
    series?: Series[];
    color?: string[];
    grid?: Grid;
    textStyle?: TextStyle;
    dataset?: Dataset;
  }

  type DatasetSource = Array<Array<string|number> | {[key: string]: string | number}> | {[key: string]: Array<string | number>};

  interface DataSet {
    source: DatasetSource;
  }

  interface Axis {
    name?: string;
    data?: Data[];
    axisLine?: AxisLine;
    splitLine?: SplitLine;
    type?: AxisType;
    inverse?: boolean;
    offset?: number;
  }

  type AxisType = 'category' | 'value' | 'time' | 'log';

  interface YAxis extends Axis {
    position?: 'left' | 'right';
  };

  interface XAxis extends Axis {
    position?: 'top' | 'bottom';
  };

  interface Data {
    value: string | number;
    textStyle?: TextStyle;
  }

  interface TextStyle {
    color?: string;
    fontStyle?: string;
    fontSize?: number;
    fontFamily?: string;
  }

  interface AxisLine {
    show?: boolean;
    lineStyle?: AxisLineStyle;
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
  }

  interface Series {
    name?: string;
    type: 'line' | 'bar' | 'pie';
    data?: any[]; // FIXME: give a proper type - not sure it's possible
    encode?: SeriesEncode;
  }

  interface SeriesEncode {
    x?: string | number[];
    y?: string | number[];
    tooltip?: string | number[];
  }
}
