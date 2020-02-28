import React, { FunctionComponent, useState, useEffect } from 'react';
import {
  LocationIndicatorData,
  SpotlightLocation,
  getBoundariesByCountryCode,
  getBoundariesByDepth,
  LocationData
} from '../../utils';
import { LocationComparisonChart } from './LocationComparisonChart';

interface ComparisonChartDataHandlerProps {
  data?: [LocationIndicatorData, LocationIndicatorData];
  location?: SpotlightLocation;
  countryCode: string;
}

const getLocationData = (locations: SpotlightLocation[], data: LocationData[]): number[] =>
  locations.map(location => {
    const match = data.find(_data => _data.name.toLowerCase() === location.name.toLowerCase());

    return match ? match.value : 0;
  });

const ComparisonChartDataHandler: FunctionComponent<ComparisonChartDataHandlerProps> = ({ data, ...props }) => {
  const [locations, setLocations] = useState<SpotlightLocation[]>([]);
  if (!data) {
    return <div>No Data</div>;
  }

  useEffect(() => {
    if (!props.location) {
      getBoundariesByCountryCode(props.countryCode).then(boundaries => {
        const requiredBoundaries = getBoundariesByDepth(boundaries, 'd');
        setLocations(requiredBoundaries.map(({ name, geocode }) => ({ name, geocode })));
      });
    }
  }, []);

  if (locations.length && data.length) {
    return (
      <LocationComparisonChart
        yAxis={locations
          .slice()
          .splice(0, 12)
          .map(location => location.name)}
        series={{
          names: [data[0].indicator, data[1].indicator],
          data: [
            getLocationData(locations.slice().splice(0, 12), data[0].data),
            getLocationData(locations.slice().splice(0, 12), data[1].data)
          ]
        }}
      />
    );
  }

  return <div>No Data</div>;
};

export { ComparisonChartDataHandler };
