import dynamic from 'next/dynamic';
import React, { Children, cloneElement, FunctionComponent, isValidElement, useEffect, useState } from 'react';
import { LocationIndicatorData, SpotlightIndicator, SpotlightLocation, SpotlightOptions } from '../../utils';
import { ErrorBoundary } from '../ErrorBoundary';
import { Loading } from '../Loading';
import { parseIndicator } from '../MapSection/utils';

interface ComponentProps {
  options?: [SpotlightOptions, SpotlightOptions];
  locations?: SpotlightLocation[];
  loading?: boolean;
  onLoad?: () => void;
}

const DynamicDataLoader = dynamic(() => import('../DDWDataLoader').then(mod => mod.DDWDataLoader), { ssr: false });
type LocData = LocationIndicatorData;

const IndicatorComparisonDataLoader: FunctionComponent<ComponentProps> = props => {
  const [loading, setLoading] = useState(props.loading);
  const [dataOne, setDataOne] = useState<LocData | undefined>(undefined);
  const [dataTwo, setDataTwo] = useState<LocData | undefined>(undefined);

  useEffect(() => setLoading(props.loading), [props.loading]);
  useEffect(() => {
    if (dataOne && dataTwo) {
      setLoading(false);
      if (props.onLoad) {
        props.onLoad();
      }
    }
  }, [dataOne, dataTwo]);

  if (!props.options) {
    return <div>No Data</div>;
  }

  const onLoad = (index: number) => (data: LocData[]): void => {
    if (index === 0) {
      setDataOne(data[0]);
    } else {
      setDataTwo(data[0]);
    }
  };

  if (loading) {
    const geocodes = props.locations && props.locations.map(loc => loc.geocode);

    return (
      <Loading active>
        {props.options.map(({ indicator, year }, index) => {
          const _indicators = [parseIndicator(indicator as SpotlightIndicator) as string];
          const onLoadByIndex = onLoad(index);

          return (
            <div key={index}>
              <ErrorBoundary>
                <DynamicDataLoader
                  indicators={_indicators}
                  startYear={year}
                  onLoad={onLoadByIndex}
                  geocodes={geocodes}
                />
              </ErrorBoundary>
            </div>
          );
        })}
      </Loading>
    );
  }

  if (dataOne && dataTwo) {
    return (
      <>
        {Children.map(props.children, child =>
          isValidElement(child) ? cloneElement(child, { data: [dataOne, dataTwo] }) : null
        )}
      </>
    );
  }

  return <div>No Data</div>;
};

export { IndicatorComparisonDataLoader };
