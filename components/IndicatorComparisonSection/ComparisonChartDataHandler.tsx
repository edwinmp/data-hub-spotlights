import React, { FunctionComponent, useState, useEffect } from 'react';
import {
  LocationIndicatorData,
  SpotlightLocation,
  getBoundariesByCountryCode,
  getBoundariesByDepth,
  LocationData,
  SpotlightIndicator
} from '../../utils';
import { LocationComparisonChart } from './LocationComparisonChart';

interface ComparisonChartDataHandlerProps {
  data?: [LocationIndicatorData, LocationIndicatorData];
  locations?: SpotlightLocation[];
  countryCode: string;
  indicators: [SpotlightIndicator, SpotlightIndicator];
}

const getLocationData = (locations: SpotlightLocation[], data: LocationData[]): number[] =>
  locations.map(location => {
    const match = data.find(_data => _data.name.toLowerCase() === location.name.toLowerCase());

    return match ? match.value : 0;
  });

const getHeightFromCount = (count = 12): string => (count >= 12 ? `${((count / 12) * 500).toFixed()}px` : '500px');

const ComparisonChartDataHandler: FunctionComponent<ComparisonChartDataHandlerProps> = ({ data, ...props }) => {
  const [locations, setLocations] = useState<SpotlightLocation[]>(props.locations || []);
  if (!data) {
    return <div>No Data</div>;
  }

  useEffect(() => {
    if (!props.locations || !props.locations.length) {
      getBoundariesByCountryCode(props.countryCode).then(boundaries => {
        const requiredBoundaries = getBoundariesByDepth(boundaries, 'd');
        setLocations(requiredBoundaries.map(({ name, geocode }) => ({ name, geocode })));
      });
    }
  }, []);

  if (locations.length && data.length) {
    return (
      <LocationComparisonChart
        yAxis={locations.map(location => location.name)}
        series={{
          names: [props.indicators[0].name, props.indicators[1].name],
          data: [getLocationData(locations, data[0].data), getLocationData(locations, data[1].data)]
        }}
        height={getHeightFromCount(locations.length)}
      />
    );
  }

  return <div>No Data</div>;
};

export { ComparisonChartDataHandler };
