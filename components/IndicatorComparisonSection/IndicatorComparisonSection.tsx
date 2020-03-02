import React, { FunctionComponent, useState } from 'react';
import { SpotlightIndicator, SpotlightLocation, SpotlightOptions, SpotlightTheme } from '../../utils';
import { ComparisonChartDataHandler } from '../ComparisonChartDataHandler';
import { IndicatorComparisonColumnChart } from '../IndicatorComparisonColumnChart';
import { IndicatorComparisonDataLoader } from '../IndicatorComparisonDataLoader';
import { LocationComparisonBarChart } from '../LocationComparisonBarChart';
import { PageSection, PageSectionHeading } from '../PageSection';
import { SpotlightHeading } from '../SpotlightHeading';
import { SpotlightInteractive } from '../SpotlightInteractive';
import { SpotlightSidebar } from '../SpotlightSidebar';
import { VisualisationSection, VisualisationSectionMain } from '../VisualisationSection';
import { ComparisonWrapper } from './ComparisonWrapper';

export interface IndicatorComparisonSectionProps {
  location?: SpotlightLocation;
  themes: SpotlightTheme[];
  countryCode: string;
  countryName: string;
}

const IndicatorComparisonSection: FunctionComponent<IndicatorComparisonSectionProps> = props => {
  const { location, themes, countryName, countryCode } = props;
  const [loading, setLoading] = useState(false);
  const [selections, setSelections] = useState<[SpotlightOptions, SpotlightOptions] | undefined>(undefined);
  const onCompare = (_selections: [SpotlightOptions, SpotlightOptions]): void => {
    if (selections) {
      if (
        _selections[0].indicator?.name !== selections[0].indicator?.name ||
        _selections[1].indicator?.name !== selections[1].indicator?.name ||
        _selections[0].year !== selections[0].year ||
        _selections[1].year !== selections[1].year
      ) {
        setSelections(_selections);
        setLoading(true);
      }
    } else {
      setSelections(_selections);
      setLoading(true);
    }
  };
  const onLoad = (): void => setLoading(false);

  return (
    <PageSection wide dark={!location}>
      <PageSectionHeading>Compare indicators for {location ? location.name : countryName}</PageSectionHeading>
      <ComparisonWrapper themes={themes} onCompare={onCompare} />
      {selections ? (
        <VisualisationSection className="spotlight--leader">
          {location ? (
            <SpotlightSidebar width="100%">
              <SpotlightHeading>{location ? location.name : countryName}</SpotlightHeading>
              <SpotlightInteractive>
                <IndicatorComparisonDataLoader
                  options={selections}
                  onLoad={onLoad}
                  loading={loading}
                  locations={location && [location]}
                >
                  <ComparisonChartDataHandler
                    countryCode={countryCode}
                    locations={props.location && [props.location]}
                    indicators={selections.map(sel => sel.indicator) as [SpotlightIndicator, SpotlightIndicator]}
                  >
                    <IndicatorComparisonColumnChart height="500px" />
                  </ComparisonChartDataHandler>
                </IndicatorComparisonDataLoader>
              </SpotlightInteractive>
            </SpotlightSidebar>
          ) : (
            <VisualisationSectionMain width="100%">
              <SpotlightHeading>Locations in {countryName}</SpotlightHeading>
              <SpotlightInteractive maxHeight="500px">
                <IndicatorComparisonDataLoader
                  options={selections}
                  onLoad={onLoad}
                  loading={loading}
                  locations={location && [location]}
                >
                  <ComparisonChartDataHandler
                    countryCode={countryCode}
                    locations={props.location && [props.location]}
                    indicators={selections.map(sel => sel.indicator) as [SpotlightIndicator, SpotlightIndicator]}
                  >
                    <LocationComparisonBarChart />
                  </ComparisonChartDataHandler>
                </IndicatorComparisonDataLoader>
              </SpotlightInteractive>
            </VisualisationSectionMain>
          )}
        </VisualisationSection>
      ) : null}
    </PageSection>
  );
};

export { IndicatorComparisonSection };
