import { useRouter } from 'next/router';
import React, { FunctionComponent, useState } from 'react';
import { SpotlightLocation, SpotlightOptions, SpotlightTheme } from '../../utils';
import { LocationComparisonChartDataHandler } from '../LocationComparisonChartDataHandler';
import { setLocationsQuery } from '../MapSection/utils';
import { SpotlightBanner } from '../SpotlightBanner';
import { SpotlightFilters } from '../SpotlightFilters';
import { VisualisationSectionMain } from '../VisualisationSection';
import { Button } from '../Button';
import { Icon } from '../Icon';

interface ComponentProps {
  themes: SpotlightTheme[];
  locations: SpotlightLocation[];
  countryCode: string;
  options: SpotlightOptions;
  onFilterChanged: (options: SpotlightOptions) => void;
  onRemoveChart: (index: number) => void;
  index: number;
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
        <Button className="button button--alt button--icon-l" onClick={(): void => props.onRemoveChart(props.index)}>
          <Icon name="-20 ico-cross-slate" />
          Remove chart
        </Button>
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
