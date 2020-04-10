import dynamic from 'next/dynamic';
import React, { Children, cloneElement, FunctionComponent, isValidElement, useEffect, useState } from 'react';
import { LocationIndicatorData, SpotlightLocation, SpotlightOptions } from '../../utils';
import { Loading } from '../Loading';
import { parseIndicator } from '../MapSection/utils';

interface ComponentProps {
  options?: SpotlightOptions;
  locations?: SpotlightLocation[];
  loading?: boolean;
  onLoad?: () => void;
}
type LocData = LocationIndicatorData;

const DynamicDataLoader = dynamic(() => import('../DDWDataLoader').then(mod => mod.DDWDataLoader), { ssr: false });

const LocationComparisonDataLoader: FunctionComponent<ComponentProps> = ({ options, ...props }) => {
  const [loading, setLoading] = useState(props.loading);
  const [data, setData] = useState<LocData | undefined>(undefined);
  useEffect(() => setLoading(props.loading), [props.loading]);
  useEffect(() => {
    if (data) {
      setLoading(false);
      if (props.onLoad) {
        props.onLoad();
      }
    }
  }, [data]);

  const onLoad = (data: LocData[]): void => {
    if (props.onLoad) {
      props.onLoad();
    }
    if (props.locations && props.locations.length > 0) {
      setData(data[0]);
    }
  };

  if (!options) {
    return (
      <div>
        <style jsx>{`
          padding: 20px;
          font-size: 16px;
        `}</style>
        No Data
      </div>
    );
  }

  if (loading) {
    return (
      <Loading active>
        <DynamicDataLoader
          indicators={options.indicator ? [parseIndicator(options.indicator) as string] : []}
          startYear={options.indicator && options.indicator.start_year}
          endYear={options.indicator && options.indicator.end_year}
          onLoad={onLoad}
          geocodes={props.locations && props.locations.map(location => location.geocode)}
          limit={10000}
        />
      </Loading>
    );
  }

  return <>{Children.map(props.children, child => (isValidElement(child) ? cloneElement(child, { data }) : null))}</>;
};

export { LocationComparisonDataLoader };
