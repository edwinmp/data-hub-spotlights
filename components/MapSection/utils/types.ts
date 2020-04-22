import { SpotlightTheme, SpotlightLocation } from '../../../utils';

export interface MapSectionProps {
  themes: SpotlightTheme[];
  onChangeLocation?: (location?: SpotlightLocation) => void;
}
