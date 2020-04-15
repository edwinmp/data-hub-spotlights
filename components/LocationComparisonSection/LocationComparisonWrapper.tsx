import { useRouter } from 'next/router';
import React, { FunctionComponent, useState } from 'react';
import { SpotlightLocation, SpotlightOptions, SpotlightTheme } from '../../utils';
import { LocationComparisonChartDataHandler } from '../LocationComparisonChartDataHandler';
import { setLocationsQuery } from '../MapSection/utils';
import { SpotlightBanner } from '../SpotlightBanner';
import { SpotlightFilters } from '../SpotlightFilters';
import { VisualisationSectionMain } from '../VisualisationSection';

interface ComponentProps {
  themes: SpotlightTheme[];
  locations: SpotlightLocation[];
  countryCode: string;
  options: SpotlightOptions;
  onFilterChanged: (options: SpotlightOptions) => void;
}

const LocationComparisonWrapper: FunctionComponent<ComponentProps> = ({ locations, options, ...props }) => {
  const [selections, setSelections] = useState<SpotlightOptions>(options);
  const router = useRouter();

  const onFilterChange = (options: SpotlightOptions): void => {
    if (options.indicator) {
      setSelections(options);
      setLocationsQuery(router, options, locations);
      props.onFilterChanged(options);
    }
  };

  return (
    <>
      <SpotlightBanner>
        <SpotlightFilters
          themes={props.themes}
          onOptionsChange={onFilterChange}
          topicLabel="Select a topic to explore"
          indicatorLabel="Choose an indicator"
          topicClassName="form-field--inline-three"
          indicatorClassName="form-field--inline-three"
          yearClassName="hide"
        />
      </SpotlightBanner>
      {selections.indicator ? (
        <VisualisationSectionMain>
          <LocationComparisonChartDataHandler
            countryCode={props.countryCode}
            locations={locations}
            indicator={selections.indicator}
          />
        </VisualisationSectionMain>
      ) : null}
    </>
  );
};

export { LocationComparisonWrapper };
