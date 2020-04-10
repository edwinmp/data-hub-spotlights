import { useRouter } from 'next/router';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { SpotlightLocation, SpotlightOptions, SpotlightTheme } from '../../utils';
import { LocationComparisonChartDataHandler } from '../LocationComparisonChartDataHandler';
import { LocationComparisonDataLoader } from '../LocationComparisonDataLoader';
import { setLocationsQuery } from '../MapSection/utils';
import { SpaceSectionBottom } from '../SpaceSectionBottom';
import { SpotlightFilters } from '../SpotlightFilters';
import { SpotlightInteractive } from '../SpotlightInteractive';
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
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => setLoading(true), [locations, selections]);

  const onFilterChange = (options: SpotlightOptions): void => {
    if (options.indicator) {
      setSelections(options);
      setLocationsQuery(router, options, locations);
      props.onFilterChanged(options);
    }
  };
  const onLoad = (): void => setLoading(false);

  return (
    <>
      <SpaceSectionBottom>
        <SpotlightFilters
          themes={props.themes}
          onOptionsChange={onFilterChange}
          topicLabel="Select a topic to explore"
          indicatorLabel="Choose an indicator"
          topicClassName="form-field--inline-three"
          indicatorClassName="form-field--inline-three"
          yearClassName="hide"
        />
      </SpaceSectionBottom>
      {selections.indicator ? (
        <VisualisationSectionMain>
          <SpotlightInteractive background="#ffffff">
            <LocationComparisonDataLoader options={selections} onLoad={onLoad} loading={loading} locations={locations}>
              <LocationComparisonChartDataHandler
                countryCode={props.countryCode}
                locations={locations}
                indicator={selections.indicator}
              />
            </LocationComparisonDataLoader>
          </SpotlightInteractive>
        </VisualisationSectionMain>
      ) : null}
    </>
  );
};

export { LocationComparisonWrapper };
