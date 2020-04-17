import { useRouter } from 'next/router';
import React, { FunctionComponent, useState } from 'react';
import { SpotlightLocation, SpotlightTheme } from '../../utils';
import { ButtonBanner } from '../ButtonBanner';
import { PageSection, PageSectionHeading } from '../PageSection';
import { SpotlightShare } from '../SpotlightShare';
import { LocationComparisonBanner } from './LocationComparisonBanner';
import LocationComparisonChartSection from './LocationComparisonChartSection';

interface ComponentProps {
  countryCode: string;
  countryName: string;
  themes: SpotlightTheme[];
  defaultLocations: SpotlightLocation[];
}
type P = ComponentProps;

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

const generateUniqueRandomID = (existing: string[]): string => {
  const randomID = `${Math.random()}`;

  return existing.includes(randomID) ? generateUniqueRandomID(existing) : randomID;
};

const LocationComparisonSection: FunctionComponent<P> = ({ countryCode, countryName, themes, ...props }) => {
  const [selectedLocations, setSelectedLocations] = useState<SpotlightLocation[]>(
    getQueryLocation() || props.defaultLocations
  );
  const [chartIDs, setChartIDs] = useState<string[]>([generateUniqueRandomID([])]);

  const addChartID = (): void => {
    setChartIDs(chartIDs.concat(generateUniqueRandomID(chartIDs)));
  };

  const onCompare = (locations: SpotlightLocation[]): void => {
    setSelectedLocations(locations);
    if (!chartIDs || chartIDs.length === 0) {
      setChartIDs(chartIDs.concat(generateUniqueRandomID([])));
    }
  };
  const onRemove = (key: string) => (): void => {
    if (chartIDs.length > 1) {
      setChartIDs(chartIDs.slice().filter(_key => _key !== key));
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
        />
      </PageSection>
      {chartIDs.map(key => (
        <LocationComparisonChartSection
          key={key}
          themes={themes}
          locations={selectedLocations}
          countryCode={countryCode}
          onRemove={onRemove(key)}
        />
      ))}
      {chartIDs.length ? (
        <PageSection narrow>
          <ButtonBanner onClick={addChartID} className="m-text-link add-location-link">
            <i role="presentation" aria-hidden="true" className="ico ico--16 ico-plus-poppy"></i>
            <span>Add another comparison</span>
          </ButtonBanner>
        </PageSection>
      ) : null}
      {chartIDs.length ? (
        <PageSection narrow>
          <SpotlightShare countryName={countryName} />
        </PageSection>
      ) : null}
    </>
  );
};

export { LocationComparisonSection };
