import { useRouter } from 'next/router';
import React, { FunctionComponent, useState } from 'react';
import { times as _times } from 'underscore';
import { getDefaultsByIndex, SpotlightLocation, SpotlightOptions, SpotlightTheme } from '../../utils';
import { ButtonBanner } from '../ButtonBanner';
import { PageSection, PageSectionHeading } from '../PageSection';
import { Spotlight } from '../Spotlight';
import { LocationComparisonBanner } from './LocationComparisonBanner';
import { LocationComparisonWrapper } from './LocationComparisonWrapper';
import { SpotlightShare } from '../SpotlightShare';

interface ComponentProps {
  countryCode: string;
  countryName: string;
  themes: SpotlightTheme[];
}

export interface LocationTagProps {
  name: string;
  geocode: string;
}

export type LocationTagType = LocationTagProps[];

const getQueryLocation = (): SpotlightLocation[] | undefined => {
  const router = useRouter();
  if (router.query.ln && router.query.lc) {
    const geocodes = router.query.lc.toString().split(',');
    const names = router.query.ln.toString().split(',');

    return geocodes.map((geocode, index) => ({ geocode, name: names[index] }));
  }
};

const LocationComparisonSection: FunctionComponent<ComponentProps> = ({ countryCode, countryName, themes }) => {
  const { selected: defaultSelected } = getDefaultsByIndex(themes);
  const [selections, setSelections] = useState<SpotlightOptions>(defaultSelected);
  const [chartCount, setChartCount] = useState<number>(1);
  const [selectedLocations, setSelectedLocations] = useState<SpotlightLocation[]>(getQueryLocation() || []);

  const onFilterChanged = (options: SpotlightOptions): void => {
    setSelections(options);
  };

  const onAddComparison = (): void => {
    setChartCount(chartCount + 1);
  };

  const onCompare = (locations: SpotlightLocation[]): void => {
    setSelectedLocations(locations);
    if (!chartCount) {
      setChartCount(1);
    }
  };

  return (
    <>
      <PageSection narrow>
        <PageSectionHeading>Location Comparison</PageSectionHeading>
        <LocationComparisonBanner
          countryName={countryName}
          countryCode={countryCode}
          onCompare={onCompare}
          locations={selectedLocations}
          options={selections}
        />
      </PageSection>
      {_times(chartCount, (index: number) => (
        <PageSection narrow key={index}>
          <Spotlight className="spotlight--full">
            <LocationComparisonWrapper
              themes={themes}
              locations={selectedLocations}
              countryCode={countryCode}
              onFilterChanged={onFilterChanged}
              options={selections}
            />
          </Spotlight>
        </PageSection>
      ))}
      {chartCount ? (
        <PageSection narrow>
          <ButtonBanner onClick={onAddComparison} className="m-text-link add-location-link">
            <i role="presentation" aria-hidden="true" className="ico ico--16 ico-plus-poppy"></i>
            <span>Add another comparison</span>
          </ButtonBanner>
        </PageSection>
      ) : null}
      {chartCount ? (
        <PageSection narrow>
          <SpotlightShare countryName={countryName} />
        </PageSection>
      ) : null}
    </>
  );
};

export { LocationComparisonSection };
