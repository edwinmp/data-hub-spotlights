import { Axes, Scales } from 'plottable';
import { Numeric } from 'plottable/build/src/axes';
import { Linear } from 'plottable/build/src/scales';
import { AxisOptions } from './types';

class NumericAxisConfig {
  private options: AxisOptions;
  private axis: Numeric;
  private scale: Linear;

  constructor(options: AxisOptions) {
    this.options = options;
    this.scale = this.createScale(this.options);
    this.axis = this.createAxis(this.options, this.scale);
  }

  setOptions(options: AxisOptions) {
    this.options = options;
  }

  getOptions() {
    return this.options;
  }

  getAxis() {
    return this.axis;
  }

  getScale() {
    return this.scale;
  }

  private createAxis(options: AxisOptions, scale: Linear) {
    const axis = new Axes.Numeric(scale, options.orientation || 'bottom');
    axis.yAlignment(options.yAlignment || 'center');
    if (options.prefix || options.suffix) {
      axis.formatter(data => `${options.prefix || ''}${data}${options.suffix || ''}`);
    }

    return axis;
  }

  private createScale(options: AxisOptions) {
    const scale = new Scales.Linear();
    scale.domain(options.domain);
    if (options.tickInterval) {
      const tickGenerator = Scales.TickGenerators.intervalTickGenerator(options.tickInterval);
      scale.tickGenerator(tickGenerator);
    }

    return scale;
  }
}

export { NumericAxisConfig };
