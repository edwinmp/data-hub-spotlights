import React, { FunctionComponent, ReactNode, useContext, useState } from 'react';
import { LocationContext, toCamelCase, CountryContext } from '../../utils';
import { KeyFactTab } from '../KeyFactTab';
import { PageSection, PageSectionHeading } from '../PageSection';
import { SpotlightTab } from '../SpotlightTab';
import { KeyFactsSectionProps } from './utils';

const KeyFactsSection: FunctionComponent<KeyFactsSectionProps> = ({ themes }) => {
  const { countryName, countryCode, currencyCode } = useContext(CountryContext);
  const location = useContext(LocationContext);
  const [activeIndex, setActiveIndex] = useState(0);

  const renderTabs = (): ReactNode =>
    themes.map((theme, index) => (
      <KeyFactTab
        key={index}
        currencyCode={currencyCode}
        theme={theme}
        active={index === activeIndex}
        location={location || { name: countryName, geocode: countryCode }}
        onActivate={(): void => setActiveIndex(index)}
      />
    ));

  return (
    <PageSection dark wide>
      <PageSectionHeading>Key facts for {toCamelCase(location ? location.name : countryName)}</PageSectionHeading>
      <SpotlightTab>{renderTabs()}</SpotlightTab>
    </PageSection>
  );
};

export { KeyFactsSection };
