import { useRouter } from 'next/router';
import React, { FunctionComponent, useState } from 'react';
import { SpotlightLocation, SpotlightOptions, SpotlightTheme } from '../../utils';
import { Button } from '../Button';
import { FormField } from '../FormField';
import { Icon } from '../Icon';
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
  onRemoveChart?: () => void;
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
        >
          <FormField className="form-field--inline-three">
            <Button className="button button--alt button--icon-l" onClick={props.onRemoveChart}>
              <Icon name="-20 ico-cross-slate" />
              Remove chart
            </Button>
          </FormField>
        </SpotlightFilters>
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
