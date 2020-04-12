import { useRouter } from 'next/router';
import React, { FunctionComponent, useState } from 'react';
import { SpotlightLocation, SpotlightOptions, SpotlightTheme } from '../../utils';
import { LocationComparisonChartDataHandler } from '../LocationComparisonChartDataHandler';
import { setLocationsQuery } from '../MapSection/utils';
import { SpaceSectionBottom } from '../SpaceSectionBottom';
import { SpotlightFilters } from '../SpotlightFilters';
import { SpotlightInteractive } from '../SpotlightInteractive';
import { VisualisationSectionMain } from '../VisualisationSection';
import { Alert } from '../Alert';

interface ComponentProps {
  themes: SpotlightTheme[];
  locations: SpotlightLocation[];
  countryCode: string;
  options: SpotlightOptions;
  onFilterChanged: (options: SpotlightOptions) => void;
}

export interface AlertStateProps {
  show: boolean;
  locationNames: string;
}

const LocationComparisonWrapper: FunctionComponent<ComponentProps> = ({ locations, options, ...props }) => {
  const [selections, setSelections] = useState<SpotlightOptions>(options);
  const [alertState, setAlertState] = useState<AlertStateProps>();
  const router = useRouter();

  const onFilterChange = (options: SpotlightOptions): void => {
    if (options.indicator) {
      setSelections(options);
      setLocationsQuery(router, options, locations);
      props.onFilterChanged(options);
    }
  };

  const foundMissingData = (show: boolean, locations: SpotlightLocation[]): any => {
    const namesArray: string[] = locations.map(location => {
      return location.name;
    });
    let namesString = '';
    if (locations.length > 1) {
      namesString = `${namesArray.slice(0, -1).join(', ')} and ${locations[locations.length - 1].name}`;
    } else {
      namesString = `${namesArray.join().toString()}`;
    }

    setAlertState({
      show,
      locationNames: namesString
    });
  };

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
      <SpaceSectionBottom>
        <div>
          <style jsx>{`
            width: 50%;
          `}</style>
          {alertState && alertState.show ? (
            <Alert variant={'notice'}>{`We do not have data for this topic for ${alertState.locationNames}`}</Alert>
          ) : null}
        </div>
      </SpaceSectionBottom>
      {selections.indicator ? (
        <VisualisationSectionMain>
          <SpotlightInteractive background="#ffffff">
            <LocationComparisonChartDataHandler
              countryCode={props.countryCode}
              locations={locations}
              indicator={selections.indicator}
              foundMissingData={foundMissingData}
            />
          </SpotlightInteractive>
        </VisualisationSectionMain>
      ) : null}
    </>
  );
};

export { LocationComparisonWrapper };
