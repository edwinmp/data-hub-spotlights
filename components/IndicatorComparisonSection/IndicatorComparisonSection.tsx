import React, { FunctionComponent, useState } from 'react';
import { SpotlightLocation, SpotlightTheme, SpotlightIndicator } from '../../utils';
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
          <SpotlightSidebar>
            <SpotlightHeading>{location ? location.name : countryName}</SpotlightHeading>
            <SpotlightInteractive></SpotlightInteractive>
          </SpotlightSidebar>
          <VisualisationSectionMain>
            <SpotlightHeading>Locations in {location ? location.name : countryName}</SpotlightHeading>
            <SpotlightInteractive maxHeight="500px"></SpotlightInteractive>
          </VisualisationSectionMain>
        </VisualisationSection>
      ) : null}
    </PageSection>
  );
};

export { IndicatorComparisonSection };
