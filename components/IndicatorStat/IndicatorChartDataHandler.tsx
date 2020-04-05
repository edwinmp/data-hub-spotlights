import React, { FunctionComponent, useEffect, useState } from 'react';
import { IndicatorChart } from '../../utils';
import { Alert } from '../Alert';
import { DataLoaderProps, useDDWData } from '../DDWDataLoader';
import { IndicatorStatChart } from './IndicatorStatChart';
import { generateChartOptions } from './utils';

interface DataHandlerProps extends IndicatorChart {
  dataOptions: DataLoaderProps;
}

const IndicatorChartDataHandler: FunctionComponent<DataHandlerProps> = ({ dataOptions, ...configs }) => {
  const [retryCount, setRetryCount] = useState(0);
  const { data, dataLoading, refetch, error } = useDDWData(dataOptions);
  useEffect(() => {
    if (error) {
      const { message } = error;
      if (message.includes('relation') && message.includes('does not exist') && retryCount === 0 && refetch) {
        refetch();
        setRetryCount(retryCount + 1);
      }
    } else {
      setRetryCount(0);
    }
  }, [error]);

  if (dataLoading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    // TODO: add manual reload button
    return <Alert variant="error">Something went wrong while loading this widget</Alert>;
  }

  if (data) {
    if (data.length === 1) {
      return <IndicatorStatChart options={generateChartOptions(configs, data)} />;
    }
    console.log('TODO: handle charts built from multiple indicators');

    // TODO: handle charts built from multiple indicators
  }

  return <div>No Data</div>;
};

export { IndicatorChartDataHandler };
