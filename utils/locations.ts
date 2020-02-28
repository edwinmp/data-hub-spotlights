import { SpotlightLocation } from './data';
import { SelectOption, SelectOptions } from '../components/Select';
import { getLocationIDFromGeoCode } from '../components/SpotlightMap/utils';

export interface SpotlightBoundary extends SpotlightLocation {
  code: string;
  children: SpotlightBoundary;
}

export const getBoundariesByCountryCode = async (countryCode: string): Promise<SpotlightBoundary[]> =>
  await import(`../boundaries/${countryCode}`).then(({ default: boundaries }) => boundaries);

export const getBoundariesByDepth = (locations: SpotlightBoundary[], depth: 'd' | 'sc'): SpotlightBoundary[] => {
  let districts: SpotlightBoundary[] = [];
  if (depth === 'd') {
    locations.forEach(location => {
      const code = getLocationIDFromGeoCode(location.geocode, '.');
      if (code.indexOf('d') > -1) {
        districts = districts.concat([location]);
      } else if (code.indexOf('r') > -1) {
        districts = districts.concat(location.children);
      }
    });
  }

  return districts;
};

// TODO: this is temporary - replace with correct location handler
export const createLocationOptions = (
  locations: SpotlightBoundary[],
  depth: 'd' | 'sc',
  _group = false // TODO: use when grouping by region/district
): SelectOptions => {
  const districts: SpotlightBoundary[] = getBoundariesByDepth(locations, depth);
  // up to district level
  const options: SelectOption[] = districts.map(content => ({
    label: content.name,
    value: content.geocode
  }));

  return options;
};
