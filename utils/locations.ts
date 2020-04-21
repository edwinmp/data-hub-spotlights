import { SelectOption, SelectOptions } from '../components/Select';
import { getLocationIDFromGeoCode } from '../components/SpotlightMap/utils';
import { SpotlightLocation } from './data';
import { toCamelCase } from './strings';
import { sortBy as _sortBy } from 'underscore';

export interface SpotlightBoundary extends SpotlightLocation {
  code: string;
  geocode: string;
  name: string;
  children: SpotlightBoundary[];
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
    label: toCamelCase(content.name),
    value: content.geocode
  }));

  return options;
};

export const sortBoundariesByName = (boundaries: SpotlightBoundary[]): SpotlightBoundary[] =>
  _sortBy(boundaries, 'name').map(boundary => {
    if (boundary.children) {
      boundary.children = sortBoundariesByName(boundary.children);
    }

    return boundary;
  });
