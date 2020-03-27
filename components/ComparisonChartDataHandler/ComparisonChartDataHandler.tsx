import React, {
  Children,
  cloneElement,
  FunctionComponent,
  isValidElement,
  useEffect,
  useState,
  ReactNode
} from 'react';
import {
  getBoundariesByCountryCode,
  getBoundariesByDepth,
  hasData,
  LocationData,
  LocationIndicatorData,
  SpotlightIndicator,
  SpotlightLocation
} from '../../utils';
import { Alert } from '../Alert';
import { Icon } from '../Icon';

interface ComparisonChartDataHandlerProps {
  data?: [LocationIndicatorData, LocationIndicatorData];
  locations?: SpotlightLocation[];
  countryCode: string;
  indicators: [SpotlightIndicator, SpotlightIndicator];
}

const getLocationData = (locations: string[], data: LocationData[]): number[] =>
  locations.map(location => {
    const match = data.find(_data => _data.name.toLowerCase() === location.toLowerCase());

    return match ? match.value : 0;
  });

const getHeightFromCount = (count = 12): string => (count >= 12 ? `${((count / 12) * 500).toFixed()}px` : '500px');

const renderPaddedAlert = (message: string): ReactNode => (
  <div>
    <Alert variant="notice">
      <Icon name="warning-warning" />
      <p>{message}</p>
    </Alert>
    <style jsx>{`
      div {
        padding: 8px;
      }
    `}</style>
  </div>
);

const ComparisonChartDataHandler: FunctionComponent<ComparisonChartDataHandlerProps> = ({ data, ...props }) => {
  const [locations, setLocations] = useState<string[]>(
    (props.locations || [])
      .map(location => location.name)
      .sort()
      .reverse() // eCharts stacks the data, first down last up. So reverse is necessary to show it properly
  );

  useEffect(() => {
    if (!props.locations || !props.locations.length) {
      getBoundariesByCountryCode(props.countryCode).then(boundaries => {
        const requiredBoundaries = getBoundariesByDepth(boundaries, 'd');
        setLocations(
          requiredBoundaries
            .map(({ name }) => name)
            .sort()
            .reverse()
        );
      });
    }
  }, []);

  if (!data || !hasData(data)) {
    return <>{renderPaddedAlert('Unfortunately, we do not have data for this location.')}</>;
  }

  if (locations.length && data.length) {
    return (
      <>
        {Children.map(
          props.children,
          child =>
            isValidElement(child) &&
            cloneElement(child, {
              labels: locations,
              series: {
                names: [props.indicators[0].name, props.indicators[1].name],
                data: [getLocationData(locations, data[0].data), getLocationData(locations, data[1].data)]
              },
              height: getHeightFromCount(locations.length)
            })
        )}
      </>
    );
  }

  return <>{renderPaddedAlert('Unfortunately, we do not have data for this location.')}</>;
};

export { ComparisonChartDataHandler };
