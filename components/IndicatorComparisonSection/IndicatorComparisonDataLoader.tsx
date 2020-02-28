import dynamic from 'next/dynamic';
import React, { Children, cloneElement, FunctionComponent, isValidElement, useEffect, useState } from 'react';
import { LocationIndicatorData, SpotlightIndicator, SpotlightLocation, SpotlightOptions } from '../../utils';
import { parseIndicator } from '../MapSection/utils';

interface ComponentProps {
  options?: [SpotlightOptions, SpotlightOptions];
  location?: SpotlightLocation;
  loading?: boolean;
  onLoad?: () => void;
}

const DynamicDataLoader = dynamic(() => import('../DDWDataLoader').then(mod => mod.DDWDataLoader), { ssr: false });
type LocData = LocationIndicatorData;

const IndicatorComparisonDataLoader: FunctionComponent<ComponentProps> = props => {
  const [loading, setLoading] = useState(props.loading);
  const [dataOne, setDataOne] = useState<LocData | undefined>(undefined);
  const [dataTwo, setDataTwo] = useState<LocData | undefined>(undefined);

  if (!props.options) {
    return <div>No Data</div>;
  }
  useEffect(() => setLoading(props.loading), [props.loading]);
  useEffect(() => {
    if (dataOne && dataTwo) {
      setLoading(false);
      if (props.onLoad) {
        props.onLoad();
      }
    }
  }, [dataOne, dataTwo]);

  const onLoad = (index: number) => (data: LocData[]): void => {
    if (index === 0) {
      setDataOne(data[0]);
    } else {
      setDataTwo(data[0]);
    }
  };

  if (loading) {
    return (
      <div>
        Loading...
        {props.options.map(({ indicator, year }, index) => {
          const _indicators = [parseIndicator(indicator as SpotlightIndicator) as string];

          return (
            <div key={index}>
              <DynamicDataLoader indicators={_indicators} year={year} onLoad={onLoad(index)} />
            </div>
          );
        })}
      </div>
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
