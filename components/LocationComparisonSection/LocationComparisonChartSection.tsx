import { useRouter } from 'next/router';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { getDefaultsByIndex, SpotlightLocation, SpotlightOptions, SpotlightTheme } from '../../utils';
import { setLocationsQuery } from '../MapSection/utils';
import { PageSection } from '../PageSection';
import { Spotlight } from '../Spotlight';
import { LocationComparisonWrapper } from './LocationComparisonWrapper';

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
    setSelections(options);
    setLocationsQuery(router, options, props.locations);
  };

  return (
    <PageSection narrow>
      <Spotlight className="spotlight--full">
        <LocationComparisonWrapper
          themes={props.themes}
          locations={props.locations}
          countryCode={props.countryCode}
          onFilterChanged={onFilterChanged}
          options={selections}
          onRemoveChart={props.onRemove}
        />
      </Spotlight>
    </PageSection>
  );
};

export default LocationComparisonChartSection;
