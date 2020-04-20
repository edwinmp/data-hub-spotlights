import { useRouter } from 'next/router';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { getDefaultsByIndex, SpotlightLocation, SpotlightOptions, SpotlightTheme } from '../../utils';
import { Button } from '../Button';
import { FormField } from '../FormField';
import { Icon } from '../Icon';
import { LocationComparisonChartDataHandler } from '../LocationComparisonChartDataHandler';
import { setLocationsQuery } from '../MapSection/utils';
import { PageSection } from '../PageSection';
import { Spotlight } from '../Spotlight';
import { SpotlightBanner } from '../SpotlightBanner';
import { SpotlightFilters } from '../SpotlightFilters';
import { VisualisationSectionMain } from '../VisualisationSection';

interface ComponentProps {
  themes: SpotlightTheme[];
  countryCode: string;
  locations: SpotlightLocation[];
  onRemove?: () => void;
}

const LocationComparisonChartSection: FunctionComponent<ComponentProps> = props => {
  const router = useRouter();
  const { selected: defaultSelected } = getDefaultsByIndex(props.themes);
  const [selections, setSelections] = useState<SpotlightOptions>(defaultSelected);
  useEffect(() => {
    setLocationsQuery(router, selections, props.locations);
  }, [props.locations]);

  const onFilterChanged = (options: SpotlightOptions): void => {
    if (options.indicator) {
      setSelections(options);
      setLocationsQuery(router, options, props.locations);
    }
  };

  return (
    <PageSection narrow>
      <Spotlight className="spotlight--full">
        <SpotlightBanner>
          <SpotlightFilters
            themes={props.themes}
            onOptionsChange={onFilterChanged}
            topicLabel="Select a topic to explore"
            indicatorLabel="Choose an indicator"
            topicClassName="form-field--inline-three"
            indicatorClassName="form-field--inline-three"
            yearClassName="hide"
          >
            <FormField className="form-field--inline-three">
              <Button className="button button--alt button--icon-l" onClick={props.onRemove}>
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
              locations={props.locations}
              indicator={selections.indicator}
            />
          </VisualisationSectionMain>
        ) : null}
      </Spotlight>
    </PageSection>
  );
};

export default LocationComparisonChartSection;
