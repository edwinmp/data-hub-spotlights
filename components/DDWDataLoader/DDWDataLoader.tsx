import React, { Children, FunctionComponent, cloneElement, isValidElement, ReactNode, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_INDICATOR_DATA, LocationIndicatorData } from '../../utils';

export interface DataLoaderProps {
  indicators?: string[];
  geocodes?: string[];
  year?: number;
  limit?: number;
  onLoad?: (data: LocationIndicatorData[]) => void;
}

const DDWDataLoader: FunctionComponent<DataLoaderProps> = ({ indicators, geocodes, year, limit, ...props }) => {
  const renderChildren = (dataLoading: boolean, data?: LocationIndicatorData[]): ReactNode =>
    Children.map(props.children, child => (isValidElement(child) ? cloneElement(child, { data, dataLoading }) : null));

  if (!indicators || !indicators.length) {
    return <>{renderChildren(false)}</>;
  }

  const { data, loading, error } = useQuery<{ data: LocationIndicatorData[] }>(GET_INDICATOR_DATA, {
    variables: {
      indicators,
      geocodes: geocodes || [],
      startYear: year,
      endYear: year,
      limit
    }
  });
  if (error) {
    throw Error(error.message);
  }
  useEffect(() => {
    if (props.onLoad && !loading && data) {
      props.onLoad(data.data);
    }
  }, [loading]);

  return <>{renderChildren(loading, data && data.data)}</>;
};

DDWDataLoader.defaultProps = { limit: 100 };

export { DDWDataLoader };
