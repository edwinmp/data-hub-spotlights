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
    xAxis?: {
      data: (string | number)[];
    },
    yAxis?: any; // FIXME: give a proper type
    series?: Series[];
  }

  interface Series {
    name: string;
    type: string;
    data: number[];
  }
}
