import React, { FunctionComponent, useState } from 'react';
import { SpotlightIndicator, SpotlightLocation, SpotlightTheme } from '../../utils';
import { PageSection, PageSectionHeading } from '../PageSection';
import { SpotlightHeading } from '../SpotlightHeading';
import { SpotlightInteractive } from '../SpotlightInteractive';
import { SpotlightSidebar } from '../SpotlightSidebar';
import { VisualisationSection, VisualisationSectionMain } from '../VisualisationSection';
import { ComparisonWrapper } from './ComparisonWrapper';
import { LocationComparisonChart } from './LocationComparisonChart';

export interface IndicatorComparisonSectionProps {
  location?: SpotlightLocation;
  themes: SpotlightTheme[];
  countryCode: string;
  countryName: string;
}

const IndicatorComparisonSection: FunctionComponent<IndicatorComparisonSectionProps> = props => {
  const { location, themes, countryName } = props;
  const [indicators, setIndicators] = useState<SpotlightIndicator[]>([]);
  const onCompare = (_indicators: SpotlightIndicator[]): void => setIndicators(_indicators);
  console.log(indicators);

  return (
    <PageSection wide dark={!location}>
      <PageSectionHeading>Compare indicators for {location ? location.name : countryName}</PageSectionHeading>
      <ComparisonWrapper themes={themes} onCompare={onCompare} />
      {indicators.length ? (
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
              <LocationComparisonChart
                legend={['Sales', 'Expenses']}
                yAxis={['Shirt', 'Cardign', 'Chiffon Shirt', 'Pants', 'Heels', 'Socks']}
                series={[
                  [5, 20, 36, 15, 10, 25],
                  [2, 30, 3, 40, 20, 36]
                ]}
              />
            </SpotlightInteractive>
          </VisualisationSectionMain>
        </VisualisationSection>
      ) : null}
    </PageSection>
  );
};

export { IndicatorComparisonSection };
