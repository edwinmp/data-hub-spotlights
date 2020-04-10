import React, { FunctionComponent, useEffect } from 'react';
import { LocationIndicatorData, SpotlightLocation, LocationData, SpotlightIndicator } from '../../utils';
import { LocationComparisonLineChart } from '../LocationComparisonLineChart';
import { groupBy } from 'underscore';
import { useDDWData, DataLoaderProps } from '../DDWDataLoader';
import { parseIndicator } from '../MapSection/utils';
import { Loading } from '../Loading';

interface ComponentProps {
  data?: LocationIndicatorData; // TODO: remove
  indicator: SpotlightIndicator;
  locations: SpotlightLocation[];
  countryCode: string;
}

const getYears = (data: LocationData[]): number[] =>
  data.reduce((prev: number[], curr) => (prev.indexOf(curr.year) === -1 ? prev.concat(curr.year) : prev), []).sort();

const getDataLoaderOptions = (indicator: SpotlightIndicator, locations: SpotlightLocation[]): DataLoaderProps => ({
  indicators: [parseIndicator(indicator) as string],
  geocodes: locations.map(location => location.geocode),
  startYear: indicator.start_year,
  endYear: indicator.end_year,
  limit: 10000
});

const LocationComparisonChartDataHandler: FunctionComponent<ComponentProps> = ({ indicator, locations }) => {
  const valueOptions = {
    dataFormat: indicator.data_format,
    prefix: indicator.value_prefix,
    suffix: indicator.value_suffix
  };

  if (!locations || locations.length === 0) {
    return <LocationComparisonLineChart years={[]} data={{}} height={'500px'} valueOptions={valueOptions} />;
  }

  const { data, dataLoading, setOptions } = useDDWData(getDataLoaderOptions(indicator, locations));
  useEffect(() => {
    setOptions(getDataLoaderOptions(indicator, locations));
  }, [locations, indicator]);

  if (!data) {
    return <LocationComparisonLineChart years={[]} data={{}} height={'500px'} valueOptions={valueOptions} />;
  }

  const groupedByLocation: { [location: string]: LocationData[] } = groupBy(data[0].data, data => data.name);
  const groupedByYear: { [location: string]: { [year: string]: LocationData[] } } = {};
  Object.keys(groupedByLocation).forEach(location => {
    const groupedByBudgetType = groupBy(groupedByLocation[location], processedData => processedData.year);
    groupedByYear[location] = groupedByBudgetType;
  });

  return (
    <Loading active={dataLoading}>
      <LocationComparisonLineChart
        years={getYears(data[0].data)}
        data={groupedByYear}
        height={'500px'}
        valueOptions={valueOptions}
      />
    </Loading>
  );
};

export { LocationComparisonChartDataHandler };
