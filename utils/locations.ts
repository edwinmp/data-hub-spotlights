import { SpotlightLocation } from './data';
import { SelectOption, SelectOptions } from '../components/Select';

export interface SpotlightBoundary extends SpotlightLocation {
  code: string;
  children: SpotlightBoundary;
}

export const getBoundariesByCountryCode = async (countryCode: string): Promise<SpotlightBoundary[]> =>
  await import(`../boundaries/${countryCode}`).then(({ default: boundaries }) => boundaries);

// TODO: this is temporary - replace with correct location handler
export const createLocationOptions = (locations: SpotlightBoundary[]): SelectOptions => {
  let districts: SpotlightBoundary[] = [];
  locations.forEach(location => {
    districts = districts.concat(location.children);
  });
  const options: SelectOption[] = districts.map(content => ({
    label: content.name,
    value: content.geocode
  }));

  return options;
};
