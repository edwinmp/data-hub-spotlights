import React, { FunctionComponent } from 'react';
import { LocationIndicatorData, SpotlightLocation } from '../../utils';
import { LocationComparisonChart } from './LocationComparisonChart';

interface ComparisonChartDataHandlerProps {
  data?: [LocationIndicatorData, LocationIndicatorData];
  dataLoading?: boolean;
  location?: SpotlightLocation;
}

const ComparisonChartDataHandler: FunctionComponent<ComparisonChartDataHandlerProps> = () => {
  return (
    <LocationComparisonChart
      yAxis={['Shirt', 'Cardign', 'Chiffon Shirt', 'Pants', 'Heels', 'Socks']}
      series={[
        [5, 20, 36, 15, 10, 25],
        [2, 30, 3, 40, 20, 36]
      ]}
    />
  );
};

export { ComparisonChartDataHandler };
