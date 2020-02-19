import { getLocationIDFromGeoCode } from '.';
import { LocationData } from '../../../utils';

type LocationStyle = [string | number, string];

export const getLocationStyles = (data?: LocationData[], range?: string[], colours?: string[]): LocationStyle[] => {
  if (data && range && colours) {
    return data.map<LocationStyle>(location => {
      const locationID = parseInt(
        // contents of the array below are bits of a geocode that need to be stripped away to get the actual code
        ['.', 'r', 'd', 'sc'].reduce((prev, curr) => getLocationIDFromGeoCode(prev, curr), location.geocode)
      );
      const matchingRange = range.find(rng => parseFloat(location.value) <= parseFloat(rng));

      if (matchingRange) {
        return [locationID, colours[range.indexOf(matchingRange)]];
      } else if (parseFloat(location.value) > parseFloat(range[range.length - 1])) {
        return [locationID, colours[colours.length - 1]];
      }

      return [locationID, '#b3adad'];
    });
  }

  return [];
};
