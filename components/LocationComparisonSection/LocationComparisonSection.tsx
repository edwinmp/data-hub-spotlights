import { useRouter } from 'next/router';
import React, { FunctionComponent, useState, ReactNode, useEffect } from 'react';
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
  const [charts, setCharts] = useState<ReactNode[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<SpotlightLocation[]>(getQueryLocation() || []);
  const onFilterChanged = (options: SpotlightOptions): void => {
    setSelections(options);
  };

  const handleRemoveChart = (index: number): void => {
    setCharts(charts => [...charts.slice(0, index), ...charts.slice(index + 1)]);
  };

  const renderChart = (index: number): ReactNode => (
    <PageSection narrow key={index}>
      <Spotlight className="spotlight--full">
        <LocationComparisonWrapper
          themes={themes}
          locations={selectedLocations}
          countryCode={countryCode}
          onFilterChanged={onFilterChanged}
          options={selections}
          onRemoveChart={handleRemoveChart}
          index={index}
        />
      </Spotlight>
    </PageSection>
  );

  useEffect(() => {
    setCharts([renderChart(0)]);
  }, []);

  const onAddComparison = (): void => {
    setCharts([...charts, renderChart(charts.length)]);
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
          options={selections}
        />
      </PageSection>
      {charts}
      {charts.length ? (
        <PageSection narrow>
          <ButtonBanner onClick={onAddComparison} className="m-text-link add-location-link">
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
