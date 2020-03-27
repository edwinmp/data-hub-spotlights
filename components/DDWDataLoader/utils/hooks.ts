import { useQuery } from '@apollo/react-hooks';
import { ApolloError } from 'apollo-client';
import { Dispatch, SetStateAction, useState } from 'react';
import { DataLoaderProps } from '..';
import { GET_INDICATOR_DATA, LocationIndicatorData } from '../../../utils';

interface DDWData {
  data?: LocationIndicatorData[];
  dataLoading: boolean;
  options: DataLoaderProps;
  setOptions: Dispatch<SetStateAction<DataLoaderProps>>;
  error?: ApolloError;
}

export const useDDWData = (_options: DataLoaderProps): DDWData => {
  const [options, setOptions] = useState(_options);
  const { indicators, geocodes, startYear, endYear, limit } = options;
  if (indicators && indicators.length) {
    const { data, loading, error } = useQuery<{ data: LocationIndicatorData[] }>(GET_INDICATOR_DATA, {
      variables: {
        indicators,
        geocodes: geocodes || [],
        startYear,
        endYear: endYear || startYear,
        limit
      }
    });
    if (error) {
      console.log('useDDWData:', error.message);

      return { data: [], dataLoading: false, options, setOptions, error };
    }

    return { data: data && data.data, dataLoading: loading, options, setOptions };
  }

  return { data: [], dataLoading: false, options, setOptions };
};
