// import { getLocationIDFromGeoCode } from '.';
import { LocationData, toCamelCase } from '../../../utils';
import { Map, MapMouseEvent, MapboxGeoJSONFeature, Popup } from 'mapbox-gl';

type LocationStyle = [string | number, string];

export const getLocationStyles = (
  data?: LocationData[],
  range?: string[],
  colours?: string[],
  format?: (value: string) => string | number
): LocationStyle[] => {
  if (data && range && colours) {
    return data.map<LocationStyle>(location => {
      const locationID = format ? format(location.name) : location.name;
      const matchingRange = range.find(rng => location.value <= parseFloat(rng));

      if (matchingRange) {
        return [locationID, colours[range.indexOf(matchingRange)]];
      } else if (location.value > parseFloat(range[range.length - 1])) {
        return [locationID, colours[colours.length - 1]];
      }

      return [locationID, '#b3adad'];
    });
  }

  return [];
};

interface TooltipOptions {
  popup: Popup;
  nameProperty: string;
  dataPrefix?: string;
  dataSuffix?: string;
}

type TooltipEvent = MapMouseEvent & { features?: MapboxGeoJSONFeature[] };

export const renderTooltip = (map: Map, event: TooltipEvent, options: TooltipOptions): void => {
  const { popup, nameProperty } = options;
  if (event.features && event.features[0].properties) {
    const geometry = event.features?.[0].geometry;
    if (geometry.type === 'Polygon') {
      if (event.features[0].properties[nameProperty]) {
        popup
          .setLngLat(event.lngLat)
          .setHTML(
            `
            <span style="font-size:1.4rem;">${toCamelCase(event.features[0].properties[nameProperty])}</span>
          `
          )
          .addTo(map);
      }
    }
  }
};
