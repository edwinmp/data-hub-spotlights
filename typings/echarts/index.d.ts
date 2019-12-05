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
    xAxis?: XAxis;
    yAxis?: YAxis;
    series?: Series[];
    color?: string[];
    grid?: Grid;
    textStyle?: TextStyle;
  }

  interface Axis {
    data?: Data[];
    axisLine?: AxisLine;
    splitLine?: SplitLine;
  }

  type YAxis = Axis;
  type XAxis = Axis;

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
    name: string;
    type: 'line' | 'bar' | 'pie';
    data: any[]; // FIXME: give a proper type - not sure it's possible
  }
}
