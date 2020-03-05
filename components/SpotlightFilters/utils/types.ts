import { SpotlightTheme, SpotlightOptions } from '../../../utils';
import { SelectOptions } from '../../Select';

export interface SpotlightFilterProps {
  themes: SpotlightTheme[];
  onOptionsChange: (options: SpotlightOptions) => void;
  topicLabel?: string;
  indicatorLabel?: string;
  yearLabel?: string;
  topicClassName?: string; // for the form field
  indicatorClassName?: string; // for the form field
  yearClassName?: string; // for the form field
  defaultIndexes?: [number, number]; // [themeIndex, indicatorIndex]
}

export interface FilterSelectOptions {
  themes: SelectOptions;
  indicators: SelectOptions;
  years: SelectOptions;
}

export interface FilterDefaults {
  options: FilterSelectOptions;
  selected: SpotlightOptions;
}
