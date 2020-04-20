import { useRouter } from 'next/router';
import React, { cloneElement, FunctionComponent, isValidElement, ReactNode, useState } from 'react';
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
  const [selectedLocations, setSelectedLocations] = useState<SpotlightLocation[]>(getQueryLocation() || []);
  const renderChart = (index: number): ReactNode => (
    <LocationComparisonChartSection
      key={index}
      themes={themes}
      locations={selectedLocations}
      countryCode={countryCode}
    />
  );
  const [charts, setCharts] = useState<ReactNode[]>([renderChart(0)]);

  const addChart = (): void => {
    setCharts(charts.concat(renderChart(charts.length)));
  };

  const onCompare = (locations: SpotlightLocation[]): void => {
    setSelectedLocations(locations);
    if (!charts || charts.length === 0) {
      setCharts(charts.concat(renderChart(charts.length)));
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
      {charts.map(chart => isValidElement(chart) && cloneElement(chart, { locations: selectedLocations }))}
      {charts.length ? (
        <PageSection narrow>
          <ButtonBanner onClick={addChart} className="m-text-link add-location-link">
            <i role="presentation" aria-hidden="true" className="ico ico--16 ico-plus-poppy"></i>
            <span>Add another comparison</span>
          </ButtonBanner>
        </PageSection>
      ) : null}
      {charts.length ? (
        <PageSection narrow>
          <SpotlightShare countryName={countryName} />
        </PageSection>
      ) : null}
    </>
  );
};

export { LocationComparisonSection };
