export * from './config';
export * from './leaflet';
export * from './types';

export const getLocationIDFromGeoCode = (geocode: string, divider: string): string => {
  const geocodeArray = geocode.split(divider);

  return geocodeArray.length > 1 ? geocodeArray[geocodeArray.length - 1] : geocodeArray[0];
};
