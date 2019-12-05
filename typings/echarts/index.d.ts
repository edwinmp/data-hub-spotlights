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
    yAxis?: YAxis; // FIXME: give a proper type
    series?: Series[];
    color?: string[];
  }

  interface Axis {
    data?: Data[];
    axisLine?: AxisLine;
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

  interface AxisLineStyle {
    color?: string;
    width?: number;
    type?: 'solid' | 'dashed' | 'dotted';
    opacity?: number;
  }

  interface Series {
    name: string;
    type: 'line' | 'bar' | 'pie';
    data: any[]; // FIXME: give a proper type - not sure it's possible
  }
}
