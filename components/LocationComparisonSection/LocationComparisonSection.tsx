import React, { FunctionComponent, ReactNode, useState } from 'react';
import { SpotlightLocation, SpotlightTheme } from '../../utils';
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
  queryLocation?: SpotlightLocation[];
}

export interface LocationTagProps {
  name: string;
  geocode: string;
}

export type LocationTagType = LocationTagProps[];

const LocationComparisonSection: FunctionComponent<ComponentProps> = ({
  countryCode,
  countryName,
  themes,
  queryLocation
}) => {
  const [selectedLocations, setSelectedLocations] = useState<SpotlightLocation[]>(queryLocation ? queryLocation : []);
  const [chartCount, setChartCount] = useState<number>(1);

  const onAddComparison = (): void => {
    setChartCount(chartCount + 1);
  };

  const renderSections = (): ReactNode => {
    const sections = [];
    for (let index = 0; index < chartCount; index++) {
      sections.push(
        <PageSection key={index}>
          <Spotlight className="spotlight--full">
            <LocationComparisonWrapper themes={themes} locations={selectedLocations} countryCode={countryCode} />
          </Spotlight>
        </PageSection>
      );
    }

    return sections;
  };

  const onCompare = (locations: SpotlightLocation[]): void => {
    setSelectedLocations(locations);
    if (!chartCount) {
      setChartCount(1);
    }
  };

  return (
    <>
      <PageSection>
        <PageSectionHeading>Location Comparison</PageSectionHeading>
        <LocationComparisonBanner
          countryName={countryName}
          countryCode={countryCode}
          onCompare={onCompare}
          locations={queryLocation ? queryLocation : []}
          themes={themes}
        />
      </PageSection>
      {renderSections()}
      {chartCount ? (
        <PageSection>
          <ButtonBanner onClick={onAddComparison} className="m-text-link add-location-link">
            <i role="presentation" aria-hidden="true" className="ico ico--16 ico-plus-poppy"></i>
            <span>Add another comparison</span>
          </ButtonBanner>
        </PageSection>
      ) : null}
      {chartCount ? (
        <PageSection>
          <SpotlightShare countryName={countryName} />
        </PageSection>
      ) : null}
    </>
  );
};

export { LocationComparisonSection };
