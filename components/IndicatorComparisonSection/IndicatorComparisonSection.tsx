import React, { FunctionComponent, useState } from 'react';
import { SpotlightLocation, SpotlightOptions, SpotlightTheme } from '../../utils';
import { PageSection, PageSectionHeading } from '../PageSection';
import { SpotlightHeading } from '../SpotlightHeading';
import { SpotlightInteractive } from '../SpotlightInteractive';
import { SpotlightSidebar } from '../SpotlightSidebar';
import { VisualisationSection, VisualisationSectionMain } from '../VisualisationSection';
import { ComparisonChartDataHandler } from './ComparisonChartDataHandler';
import { ComparisonWrapper } from './ComparisonWrapper';
import { IndicatorComparisonDataLoader } from './IndicatorComparisonDataLoader';

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
    setSelections(_selections);
    setLoading(true);
  };
  const onLoad = (): void => setLoading(false);

  return (
    <PageSection wide dark={!location}>
      <PageSectionHeading>Compare indicators for {location ? location.name : countryName}</PageSectionHeading>
      <ComparisonWrapper themes={themes} onCompare={onCompare} />
      {selections ? (
        <VisualisationSection className="spotlight--leader">
          {location ? (
            <SpotlightSidebar>
              <SpotlightHeading>{location ? location.name : countryName}</SpotlightHeading>
              <SpotlightInteractive></SpotlightInteractive>
            </SpotlightSidebar>
          ) : null}
          <VisualisationSectionMain width={!location ? '100%' : undefined}>
            <SpotlightHeading>Locations in {location ? location.name : countryName}</SpotlightHeading>
            <SpotlightInteractive maxHeight="500px">
              <IndicatorComparisonDataLoader options={selections} onLoad={onLoad} loading={loading}>
                <ComparisonChartDataHandler countryCode={countryCode} />
              </IndicatorComparisonDataLoader>
            </SpotlightInteractive>
          </VisualisationSectionMain>
        </VisualisationSection>
      ) : null}
    </PageSection>
  );
};

export { IndicatorComparisonSection };
