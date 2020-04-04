import { SpotlightLocation, SpotlightTheme } from '../../../utils';

export interface KeyFactsSectionProps {
  location?: SpotlightLocation;
  themes: SpotlightTheme[];
  countryCode: string;
  countryName: string;
  currencyCode: string;
}
