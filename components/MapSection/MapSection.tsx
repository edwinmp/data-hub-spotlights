import { useRouter, NextRouter } from 'next/dist/client/router';
import dynamic from 'next/dynamic';
import React, { FunctionComponent, ReactNode, useState, useEffect } from 'react';
import { SpotlightLocation, SpotlightOptions } from '../../utils';
import { AnchorButton } from '../AnchorButton';
import { ErrorBoundary } from '../ErrorBoundary';
import { Legend, LegendItem } from '../Legend';
import { LocationSelectionBanner } from '../LocationSelectionBanner';
import { PageSection } from '../PageSection';
import { SpotlightButtons } from '../SpotlightButtons';
import { SpotlightFilters } from '../SpotlightFilters';
import { SpotlightIndicatorInfo } from '../SpotlightIndicatorInfo';
import { SpotlightInteractive } from '../SpotlightInteractive';
import { SidebarContent, SpotlightHide, SpotlightSidebar, SpotlightSidebarInfo } from '../SpotlightSidebar';
import { VisualisationSection, VisualisationSectionMain } from '../VisualisationSection';
import {
  getDataPrefix,
  getDataSuffix,
  getIndicatorColours,
  MapSectionProps,
  parseIndicator,
  splitByComma,
  setQuery,
  getDefaultLocationFromQuery
} from './utils';

const DynamicMap = dynamic(() => import('../SpotlightMap').then(mod => mod.SpotlightMap), { ssr: false });
const DynamicMapDataLoader = dynamic(() => import('../DDWDataLoader').then(mod => mod.DDWDataLoader), { ssr: false });
const SpotlightShare = dynamic(() => import('../SpotlightShare').then(mod => mod.SpotlightShare), { ssr: false });

const renderLegendItems = (range?: string[], colours?: string[]): ReactNode => {
  if (range && colours) {
    return range
      .map((rnge, index) => (
        <LegendItem bgColor={colours[index]} key={index}>
          {index === 0 ? `< ${range[0]}` : `${range[index - 1]}-${rnge}`}
        </LegendItem>
      ))
      .concat([
        <LegendItem bgColor={colours[colours.length - 1]} key={range.length}>
          {`> ${range[range.length - 1]}`}
        </LegendItem>
      ]);
  }

  return null;
};

const getComparePath = (router: NextRouter): string => {
  const pathname = router.asPath.split('?')[0].split('#')[0];

  return `${pathname}${pathname.endsWith('/') ? '' : '/'}compare`;
};

const MapSection: FunctionComponent<MapSectionProps> = ({ countryCode, onChangeLocation, ...props }) => {
  const router = useRouter();
  const [options, setOptions] = useState<SpotlightOptions>({});
  const [activeLocation, setActiveLocation] = useState<SpotlightLocation | undefined>(
    router ? getDefaultLocationFromQuery(router.query) : undefined
  );
  useEffect(() => {
    if (onChangeLocation) {
      onChangeLocation(activeLocation);
    }
    if (router.query.ln && router.query.lc) {
      localStorage.setItem('initialSelectedLocation', JSON.stringify(getDefaultLocationFromQuery(router.query)));
    } else {
      localStorage.removeItem('initialSelectedLocation');
    }
  }, []);

  const onOptionsChange = (optns: SpotlightOptions): void => {
    setQuery(router, optns, activeLocation);
    setOptions(optns);
  };
  const onSelectLocation = (location?: SpotlightLocation): void => {
    setQuery(router, options, location);
    setActiveLocation(location);
    if (onChangeLocation) {
      localStorage.setItem('initialSelectedLocation', JSON.stringify(location));
      onChangeLocation(location);
    }
  };

  const range = options.indicator && splitByComma(options.indicator.range);
  const colours = getIndicatorColours(options.indicator, range);
  const indicatorID = options.indicator && parseIndicator(options.indicator);
  const compareLocationBaseUrl = router ? router.asPath.split('?')[0] : '';

  return (
    <PageSection>
      <LocationSelectionBanner
        className="spotlight-banner--header"
        onSelectLocation={onSelectLocation}
        countryCode={countryCode}
        countryName={props.countryName}
        defaultLocation={activeLocation}
      />

      <VisualisationSection>
        <SpotlightSidebar className="spotlight__aside--no-margin">
          <SidebarContent>
            <SpotlightFilters
              themes={props.themes}
              onOptionsChange={onOptionsChange}
              topicClassName=""
              indicatorClassName="form-field--spaced-minor"
              yearClassName="form-field--inline"
            />
            <SpotlightHide>
              <SpotlightIndicatorInfo
                heading={options.indicator && options.indicator.name}
                description={options.indicator && options.indicator.description}
              />
              <Legend>
                {renderLegendItems(range, colours)}
                <LegendItem>no data / not applicable</LegendItem>
              </Legend>
              <SpotlightButtons>
                {router ? (
                  <AnchorButton
                    href={`${compareLocationBaseUrl}${compareLocationBaseUrl.endsWith('/') ? '' : '/'}compare`}
                  >
                    Compare this location to others
                  </AnchorButton>
                ) : null}
                <SpotlightShare
                  countryName={props.countryName}
                  location={activeLocation}
                  buttonCaption="Share this visualisation"
                />
              </SpotlightButtons>
            </SpotlightHide>
          </SidebarContent>
        </SpotlightSidebar>

        <VisualisationSectionMain className="spotlight__main--map">
          <SpotlightInteractive height="100%">
            {router ? (
              <div>
                <AnchorButton className="button button--secondary--fill" href={getComparePath(router)}>
                  Compare this location to others
                </AnchorButton>
                <style jsx>{`
                  position: absolute;
                  top: 1.75em;
                  z-index: 20;
                  left: 1.4em;
                `}</style>
              </div>
            ) : null}
            <ErrorBoundary>
              <DynamicMapDataLoader
                indicators={indicatorID ? [indicatorID] : undefined}
                geocodes={activeLocation && [activeLocation.geocode]}
                startYear={options.year ? options.year : options.indicator && options.indicator.start_year}
                limit={10000}
              >
                <DynamicMap
                  countryCode={countryCode}
                  range={range}
                  colours={colours}
                  dataPrefix={getDataPrefix(options)}
                  dataSuffix={getDataSuffix(options)}
                  location={activeLocation}
                  locationHandling="flyto"
                />
              </DynamicMapDataLoader>
            </ErrorBoundary>
          </SpotlightInteractive>
        </VisualisationSectionMain>

        <SpotlightSidebar className="spotlight__aside--ss">
          <SidebarContent>
            <SpotlightSidebarInfo
              heading={options.indicator && options.indicator.name}
              description={options.indicator && options.indicator.description}
            />
            <Legend>
              {renderLegendItems(range, colours)}
              <LegendItem>no data / not applicable</LegendItem>
            </Legend>
            <SpotlightButtons>
              <SpotlightShare
                countryName={props.countryName}
                location={activeLocation}
                buttonCaption="Share this visualisation"
              />
            </SpotlightButtons>
          </SidebarContent>
        </SpotlightSidebar>
      </VisualisationSection>
    </PageSection>
  );
};

export { MapSection };
